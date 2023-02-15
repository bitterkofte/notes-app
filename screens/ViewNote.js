import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react'
import FancyAlert from '../components/FancyAlert';

const ViewNote = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);

  function editHandler() {
    navigation.navigate('EditNote',{id: route.params.noteId, t: route.params.t, d: route.params.d});
  }

  function visibility(s) {
    setVisible(s);
    console.log(s);
    // console.log(route.params.time);
    // console.log(new Date(route.params.time.seconds*1000));
  }

  let day = '';

  useEffect(() => {
    // day = new Date(route.params.time.seconds*1000);
    day = new Date(route.params.time.toDate());
    console.log(day);
  }, [])


  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{route.params.t}</Text>
        </View>

        <View style={styles.detailsContainer}>
            <Text style={styles.details}>{route.params.d}</Text>
        </View>

        {/* MODAL */}
        <FancyAlert visible={visible} visibility={visibility} id={route.params.noteId} />
        <View style={styles.bottomContainer}>
          <View style={styles.deleteContainer}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={() =>  visibility(true)}>
              <MaterialIcons style={styles.icon} name='delete' size={40}/>
            </Pressable>
          </View>

          <View style={styles.editTimeContainer}>
            <View>
              <Text style={styles.editTime}>last edited at {day}</Text>
            </View>
          </View>

          <View style={styles.editContainer}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={editHandler}>
              <MaterialCommunityIcons style={styles.icon} name='pencil' size={40}/>
            </Pressable>
          </View>
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

    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      bottom: 10,
    },

    deleteContainer: {
      backgroundColor: '#ff3b3b',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },

    editContainer: {
      backgroundColor: '#ff9012',
      borderRadius: 25,
      elevation: 5,
      overflow: 'hidden',
    },
    icon: {
      padding: 10,
    },

    editTimeContainer: {
      // width: '100%',
      // backgroundColor: '#FFFFFF',

      // justifyContent: 'center',
      // alignItems: 'center',
    },
    editTime: {
      fontFamily: 'Sofia',
    },
})