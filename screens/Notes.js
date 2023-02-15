import { FlatList, StyleSheet, Text, View, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import { getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, colRef } from '../firebase';

import NoteTile from '../components/NoteTile';
import Picker from '../components/Picker';

const Notes = ({navigation}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');

    function changeOrder(o) {
      setValue(o);
      console.log(o, 'hasan');
    }
    
    let q = query(colRef, orderBy('title', 'asc'));

    switch (value) {
      case 'titleA':
        q = query(colRef, orderBy('title', 'asc'));
        break;
      case 'titleD':
        q = query(colRef, orderBy('title', 'desc'));
        break;
      case 'timeA':
        q = query(colRef, orderBy('createdAt', 'asc'));
        break;
      case 'timeD':
        q = query(colRef, orderBy('createdAt', 'desc'));
        console.log('oldu');
        break;

      default:
        q = query(colRef, orderBy('title', 'asc'));
    }

    // const q = query(colRef, orderBy('title', 'asc'));
    // const q = query(colRef, orderBy('createdAt', 'asc'));

    useEffect(() => {
        const subscriber = onSnapshot(q, (snapshot) => {
            const notes = [];
      
            snapshot.docs.forEach(doc => {
              notes.push({...doc.data(), id: doc.id});
            });
      
            setNotes(notes);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [value]);
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    function addHandler () {
      navigation.navigate('AddNote');
    }

    function renderTile({item}) {
        function pressHandler() {navigation.navigate("ViewNote", {noteId: item.id, t: item.title, d: item.details});}
        // console.log(item.title);
        return <NoteTile 
                title={item.title}
                det={item.details}
                pressFunc={pressHandler} />;
    }

  return (
      <View style={styles.flatlistContainer}>
        <View style={styles.pickerContainer}>
          <Picker changeOrder={changeOrder} />
        </View>
        <FlatList data={notes} 
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

    pickerContainer: {
      margin: 10,
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