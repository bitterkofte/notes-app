import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ColorPalette from '../components/ColorPalette';

const EditNote = ({route, navigation}) => {
  const [title, setTitle] = useState(route.params.t);
  const [details, setDetails] = useState(route.params.d);

  const { color } = useSelector((state) => state.colorizer);

  const saveHandler = async () => {
    try{
      let docRef = doc(db, 'notes', route.params.id)
  
      await updateDoc(docRef, {
        title: title,
        details: details,
        color: color,
      })
      .then(() => {
        navigation.pop(2);
        // navigation.navigate('ViewNote', {id: route.params.id});
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