import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { auth, collUser, db } from '../firebase';
import ColorPalette from '../components/ColorPalette';

const EditNote = ({route, navigation}) => {
  const {t,d,time,docId} = route.params;
  const [title, setTitle] = useState(t);
  const [details, setDetails] = useState(d);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState([])
  const q = query(collUser, where("email", "==", auth.currentUser.email))
  useEffect(()=>{
    const subscriber = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach(doc => {
        setUser({...doc.data(), id: doc.id});
      });
      setLoading(false);
      // console.log(user);
      // function isThisNote(note) {
      //   return note.time === time;
      // }
      
      // console.log('AAAAAA: ',inventory)
      // console.log(inventory.find((i)=> i.time === time));
      
      // console.log('index: ', inx)
      
    });
    return () => subscriber();
  },[loading])

  // console.log('Doc',t);

  const saveHandler = async () => {
    let inventory = [...user.notes];
    try{
      // console.log('AAAAAA: ',inventory)
      let inx = user.notes.indexOf(inventory.find((i)=> i.time === time))
      inventory[inx] = {title: title, details: details, time: time}
      // console.log(inventory)
      let docRef = doc(db, 'users', docId)
      await updateDoc(docRef, {
        notes: inventory,
      })
      .then(() => {
        console.log('UPDATED')
        navigation.navigate('Notes', {updated: true});
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
            {/* <Text style={styles.title}>{route.params.t}</Text> */}
            <TextInput style={styles.title} value={title} onChangeText={(text) => setTitle(text)} />
        </View>

        <View style={styles.detailsContainer}>
            {/* <Text style={styles.details}>{route.params.d}</Text> */}
            <TextInput style={styles.details} value={details} onChangeText={(text) => setDetails(text)} multiline />
        </View>

        <View style={styles.buttonContainer}>
          <ColorPalette />
          <Pressable style={styles.button} android_ripple={{color: '#d9d9d9'}} onPress={saveHandler}>
            <Entypo style={styles.icon} name='save' size={40}/>
          </Pressable>
        </View>
    </View>
  )
}

export default EditNote

const styles = StyleSheet.create({
    noteContainer: {
        flex: 1,
        margin: 15,
    },

    titleContainer: {
      padding: 7,
      marginBottom: 15,
      borderStyle: 'dashed',
      borderWidth: 2,
    },
    title: {
      fontSize: 40,
      fontFamily: 'SofiaProBold',
    },

    detailsContainer: {
      padding: 7,
      paddingTop: 10,
      borderStyle: 'dashed',
      borderWidth: 2,
    },
    details: {
      fontSize: 20,
      fontFamily: 'Sofia',
    },

    buttonContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: '#b92929',
    },
    button: {
      backgroundColor: '#44dd51',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },
    icon:{
      padding: 10,
    }
})