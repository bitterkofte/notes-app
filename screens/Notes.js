import { FlatList, StyleSheet, Text, View, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import { getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, collUser, auth } from '../firebase';

import NoteTile from '../components/NoteTile';
import Picker from '../components/Picker';
import IconButton from '../components/IconButton';

const Notes = ({navigation}) => {
    // const [notes, setNotes] = useState([]);
    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');
    const [user, setUser] = useState([]);
    
    let arr = user.notes;

    function changeOrder(o) {
      setValue(o);
      arr = user.notes;
      switch (o) {
        case 'titleA':
          console.log('titleA');
          console.log(user.name)
          break;
        case 'titleD':
          console.log('titleD');
          console.log(user.email)
          break;
        case 'timeA':
          arr.sort((a,b)=> a.time - b.time);
          console.log('Artan: ', arr);
          break;
        case 'timeD':
          arr.sort((a,b)=> b.time - a.time);
          console.log('Azalan: ', arr);
          break;
  
        default:
          console.log('empty');
      }
    }

    function goToUserScreen() {
      navigation.navigate('User', {user: {email: user.email, name: user.name, notes: user.notes}});
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {return <IconButton name="account-circle" size={35} onPress={goToUserScreen}/>},
        headerLeft: () => {return <IconButton name="arrow-circle-down" size={35} onPress={recieve}/>}
      });
    }, [navigation, ])

    const q = query(collUser, where("email", "==", auth.currentUser.email))

    useEffect(()=>{
      const subscriber = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          setUser({...doc.data(), id: doc.id});
        });
        
        setLoading(false);
      });
      return () => subscriber();
    },[user])

    function recieve() {
      console.log('User: ',auth.currentUser.email)
      // onSnapshot(q, (snapshot) => {
      //   snapshot.docs.forEach(doc => {
      //     setUser({...doc.data(), id: doc.id});
      //   });
        console.log('Documents: ',user);
        console.log('Notes: ',user.notes);
        setLoading(false);
      // });
    }
    
    if (loading) {
        return <ActivityIndicator style={{flex:1, justifyContent: 'center', alignItems: 'center'}} size="large" color="#0000ff" />;
    }

    function addHandler () {
      navigation.navigate('AddNote', {docId: user.id, notes: user.notes});
    }

    function renderTile({item}) {
        function pressHandler() {navigation.navigate("ViewNote",  {t: item.title, d: item.details, time: item.time, docId: user.id});}
        // console.log(item.title);
        return <NoteTile 
                title={item.title}
                det={item.details}
                pressFunc={pressHandler} />;
    }

  return (
      <View style={styles.flatlistContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome {user.name}</Text>
          <View style={styles.pickerContainer}>
            <Picker changeOrder={changeOrder} />
          </View>
        </View>
        <FlatList data={arr}
          keyExtractor={(item) => item.time}
          renderItem={renderTile}
          numColumns={2}
          style={styles.flatlist} />
        {/* <View><Text>{arr.map((i)=> <Text key={i.time}>{i.title} - </Text>)}</Text></View> */}
        <View style={styles.buttonContainer}>
          <Pressable android_ripple={{color: '#d9d9d9'}} onPress={addHandler}>
            <MaterialIcons style={styles.icon} name='add' size={40}/>
          </Pressable>
        </View>
      </View>
  )
}

export default Notes

const styles = StyleSheet.create({
    flatlistContainer: {
      flex: 1,
      margin: 10,
      // backgroundColor: '#ffa46c',
    },

    headerContainer: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      fontFamily: 'SofiaProBold',
      fontSize: 23,
      color: '#488899',
    },
    pickerContainer: {
      width: '35%',
      // flexDirection: 'row',
    },

    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: '#a144ff',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },
    icon: {
      padding: 10,
    }
})