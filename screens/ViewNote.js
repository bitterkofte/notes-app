import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React from 'react'

const ViewNote = ({route, navigation}) => {
  // const nId = route.params.noteId;

  // const showRelatedNote = notes.filter((note) => {
  //   return note.id.indexOf(catgId) >= 0;
  //   //categoryIds is an element in the MEALS object
  // });
  function editHandler() {
    navigation.navigate('EditNote',{id: route.params.noteId, t: route.params.t, d: route.params.d});
  }

  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{route.params.t}</Text>
        </View>

        <View style={styles.detailsContainer}>
            <Text style={styles.details}>{route.params.d}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable android_ripple={{color: '#d9d9d9'}} onPress={editHandler}>
            <MaterialCommunityIcons style={styles.icon} name='pencil' size={40}/>
          </Pressable>
        </View>
    </View>
  )
}

export default ViewNote

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
      borderColor: '#8be2a8',
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
    },

    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: '#ff9012',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },
    icon: {
      padding: 10,
    }
})