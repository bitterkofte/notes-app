import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { addDoc, serverTimestamp } from 'firebase/firestore';
import { db, colRef } from '../firebase';
import ColorPalette from '../components/ColorPalette';

const AddNote = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');  
  const [isSent, setIsSent] = useState(false);

  const { color } = useSelector((state) => state.colorizer);
  
  const sendNote = () => {
    addDoc(colRef, {
      title: title,
      details: details,
      createdAt: serverTimestamp(),
      color: color,
    })
    .then(() => {
      setIsSent(true);
      navigation.navigate('Notes');
    })
  }

  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
          <TextInput style={styles.title} value={title} onChangeText={(text) => setTitle(text)} />
        </View>

        <View style={styles.detailsContainer}>
          <TextInput style={styles.details} value={details} onChangeText={(text) => setDetails(text)} multiline />
        </View>

        <View style={styles.bottomContainer}>
          <ColorPalette />
          <View style={styles.buttonContainer}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={sendNote}>
              <Entypo style={styles.icon} name='save' size={40}/>
            </Pressable>
          </View>
        </View>
    </View>
  )
}

export default AddNote

const styles = StyleSheet.create({
    noteContainer: {
        flex: 1,
        margin: 15,
    },

    titleContainer: {
      padding: 9,
      marginBottom: 15,
      borderBottomWidth: 3,
      borderRadius: 7,
      borderColor: '#af8be2',
    },
    title: {
      fontSize: 40,
      fontFamily: 'SofiaProBold',
    },

    detailsContainer: {
      padding: 9,
    },
    details: {
      fontSize: 20,
      fontFamily: 'Sofia',
      textAlign: 'justify',
      // height: 500,
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start',
      // borderWidth:2,
    },

    bottomContainer: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      backgroundColor: '#44dd51',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },
    icon: {
      padding: 10,
    }
})