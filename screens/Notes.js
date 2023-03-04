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
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);
    // const [zaman, setZaman] = useState(0);

    function changeOrder(o) {
      setValue(o);
      // console.log(o, 'hasan');
    }
    // let zaman = user.notes.time;
    // let q = query(colRef, orderBy('title', 'asc'));

    // switch (value) {
    //   case 'titleA':
    //     q = query(colRef, orderBy('title', 'asc'));
    //     break;
    //   case 'titleD':
    //     q = query(colRef, orderBy('title', 'desc'));
    //     break;
    //   case 'timeA':
    //     let sonuc = zaman.sort((a,b)=> a.time - b.time);
    //     console.log(sonuc);
    //     break;
    //   case 'timeD':
    //     zaman.sort((a,b)=> b.time - a.time);
    //     break;

    //   default:
    //     // q = query(colRef, orderBy('title', 'asc'));
    // }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {return <IconButton name="account-circle" size={35} onPress={()=>navigation.navigate('User', {email: user.email})}/>},
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


    // useEffect(() => {
    //     const subscriber = onSnapshot(q, (snapshot) => {
    //         const notes = [];
      
    //         snapshot.docs.forEach(doc => {
    //           notes.push({...doc.data(), id: doc.id});
    //         });
      
    //         setNotes(notes);
    //         setLoading(false);
    //       });
      
    //     // Unsubscribe from events when no longer in use
    //     return () => subscriber();
    //   }, [value]);


    // //GETTING USER DATA
    // useEffect(() => {
    //   const subscriber = onSnapshot(q, (snapshot) => {
    //       snapshot.docs.forEach(doc => {
    //         setUser({...doc.data(), id: doc.id});
    //       });
    //       // setUsers(user);
    //       // setData(users[0].notes);
    //       // console.log('data: ',users[0]);
    //       // users.map((a)=>console.log('KK: ',a));
    //       console.log('not: ',user);
    //       setLoading(false);
    //     });

    //   // Unsubscribe from events when no longer in use
    //   return () => subscriber();
    // }, [user]);
    
    if (loading) {
        return <ActivityIndicator style={{flex:1, justifyContent: 'center', alignItems: 'center'}} size="large" color="#0000ff" />;
    }

    function addHandler () {
      navigation.navigate('AddNote', {docId: user.id, notes: user.notes});
    }

    function renderTile({item}) {
        function pressHandler() {navigation.navigate("ViewNote", {noteId: item.id, t: item.title, d: item.details, time: item.createdAt});}
        // console.log(item.title);
        return <NoteTile 
                title={item.title}
                det={item.details}
                pressFunc={pressHandler} />;
    }

  return (
      <View style={styles.flatlistContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome</Text>
          <View style={styles.pickerContainer}>
            <Picker changeOrder={changeOrder} />
          </View>
        </View>

        <FlatList data={user.notes}
          keyExtractor={(item) => item.id}
          renderItem={renderTile}
          numColumns={2}
          style={styles.flatlist} />
          
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