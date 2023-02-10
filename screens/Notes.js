import { FlatList, StyleSheet, Text, View, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import { getDocs, onSnapshot } from 'firebase/firestore';
import { db, colRef } from '../firebase';

import NoteTile from '../components/NoteTile';

const Notes = ({navigation}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = onSnapshot(colRef, (snapshot) => {
            const notes = [];
      
            snapshot.docs.forEach(doc => {
              notes.push({...doc.data(), id: doc.id});
            });
      
            setNotes(notes);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
    
    if (loading) {
        return <ActivityIndicator />;
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