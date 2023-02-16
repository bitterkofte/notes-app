import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';

const FancyAlert = ({visible, visibility, id}) => {
  const navigation = useNavigation();

  function deleteHandler() {
    const docRef = doc(db, 'notes', id)

  deleteDoc(docRef)
    .then(() => {
      navigation.navigate('Notes');
    })
  }

  // console.log(id);



  return (
    <Modal transparent statusBarTranslucent animationType='fade' visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.dialogContainer}>
          <Text style={[styles.text, {fontSize: 16}]}>Are you sure you want to delete this note?</Text>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancel} android_ripple={{color: '#d9d9d9'}} onPress={() => visibility(false)}>
              <Text style={[styles.text, {fontFamily: 'SofiaProBold'}]}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.delete} android_ripple={{color: '#d9d9d9'}} onPress={() => deleteHandler()}>
              <Text style={[styles.text, {fontFamily: 'SofiaProBold'}]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FancyAlert

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696969a3',
  },

  dialogContainer: {
    backgroundColor: '#e8e8e8',
    padding: 25,
    borderRadius: 20,
    elevation: 10,
  },

  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancel: {
    backgroundColor: '#8f8f8f',
    padding: 10,
    borderRadius: 10,
  },

  delete: {
    backgroundColor: '#e45656',
    padding: 10,
    borderRadius: 10,
  },

  text: {
    fontFamily: 'Sofia',
  },
})