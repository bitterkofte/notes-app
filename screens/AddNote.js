import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, {useEffect, useState} from 'react'
// import { useSelector } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'; 

import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { db, colRef } from '../firebase';
import ColorPalette from '../components/ColorPalette';

const AddNote = ({navigation, route}) => {
  // const [title, setTitle] = useState('');
  // const [details, setDetails] = useState('');  
  // const [isSent, setIsSent] = useState(false);

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [color, setColor] = useState('#d4ff9b');
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([]);

  // useEffect(()=>{
  //   console.log('NOTLAR: ',notes)
  //     updateDoc(docRef, {
  //       notes,
  //     })
  //     .then(() => {
  //       console.log('Updated');
  //       navigation.navigate('Notes');
  //     })
  // },[notes]);

  // const { color } = useSelector((state) => state.colorizer);
  
  // const sendNote = () => {
  //   addDoc(colRef, {
  //     title: title,
  //     details: details,
  //     createdAt: serverTimestamp(),
  //     color: color,
  //   })
  //   .then(() => {
  //     setIsSent(true);
  //     navigation.navigate('Notes');
  //   })
  // }
  const docRef = doc(db, 'users', route.params.docId)

  async function updateNotes() {
    if (title === '' || detail === '') {
      console.warn('Each input must have a value');
    }
    else {
      // setId((prev) => prev + 1);
      // console.log('notes:' ,route.params.notes);
      route.params.notes.push({title: title, details:detail, color:color, time: Date.now() })
      console.log(route.params.notes);
      setNotes(route.params.notes);
      // setNotes( [route.params.notes , {title: title, details:detail, color:color, time: serverTimestamp() }]);
    }
  }

  // updateNotes().then()
  const update = () => {
    updateDoc(docRef, {
      notes,
    })
    .then(() => {
      console.log('UPDATED')
      navigation.navigate('Notes', {updated: true});
    })
  }

  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
          <TextInput style={styles.title} value={title} onChangeText={(text) => setTitle(text)} />
        </View>

        <View style={styles.detailsContainer}>
          <TextInput style={styles.details} value={detail} onChangeText={(text) => setDetail(text)} multiline />
        </View>

        <View style={styles.bottomContainer}>
          {/* <ColorPalette /> */}
          <View style={[styles.buttonContainer, {backgroundColor: '#00bfff'}]}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={update}>
              <FontAwesome style={styles.icon} name='send' size={40}/>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={updateNotes}>
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