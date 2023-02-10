import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

import { addDoc } from 'firebase/firestore';
import { db, colRef } from './firebase';

const NewNote = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');  
  const [isSent, setIsSent] = useState(false);

  // const randColor = Math.floor(Math.random()*16777215).toString(16);

  const sendNote = () => {
    addDoc(colRef, {
      title: title,
      details: details,
    })
    .then(() => {
      setDetails('');
      setTitle('');
      setIsSent(true);
    })
  }
  return (
    <View style={styles.container}>
      {!!isSent && (
        <View style={styles.notificationContainer}>
        <View style={styles.notification}>
          <Text style={styles.textAlert}>Note has been saved ❤️</Text>
        </View>
        </View>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.header}><Text style={styles.headerText}>Note It!</Text></View>
        <Text>Title</Text>
        <TextInput style={styles.input} value={title} placeholder="Title" onChangeText={setTitle} />
        <Text>Details</Text>
        <TextInput style={styles.input} value={details} placeholder="Details" onChangeText={setDetails} />
        <Button onPress={sendNote} title='send' style={styles.button} />
      </View>
    </View>
  )
}

export default NewNote

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 20,
      },
      
      notificationContainer: {
        alignItems: 'center',
      },
      notification: {
        // backgroundColor: randColor,
        backgroundColor: '#6fb5ff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
      },
      textAlert: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      
      header: {
        alignItems: 'center',
        marginBottom:  25,
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 40,
      },
    
      input: {
        borderColor: '#007bff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
      },
      // inputContainer: {
      //   alignItems: 'flex-start',
      // },
    
    
      // button: {
      //   marginTop: 10,
      // }
})