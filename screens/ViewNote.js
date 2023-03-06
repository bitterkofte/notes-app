import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react'
import FancyAlert from '../components/FancyAlert';

const ViewNote = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);
  const {t,d,time,docId} = route.params;

  function editHandler() {
    navigation.navigate('EditNote', {time: time, t: t, d: d, docId: docId});
  }

  function visibility(s) {
    setVisible(s);
  }

  let day = '';
  day = new Date(time);
  let saat = day.getHours();
  let dakika = day.getMinutes();
  let gun = day.getDate();
  let ay = (day.getMonth() + 1);
  let yil = day.getFullYear();

  if (gun < 10) {
    gun = '0' + gun;
  } if (ay < 10) {
    ay = '0' + ay;
  } if (dakika < 10) {
    dakika = '0' + dakika;
  }
  let zaman = `${saat}:${dakika}`;
  let tarih = `${gun}/${ay}/${yil}`;


  return (
    <View style={styles.noteContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{t}</Text>
        </View>

        <View style={styles.detailsContainer}>
            <Text style={styles.details}>{d}</Text>
        </View>

        {/* MODAL */}
        <FancyAlert visible={visible} visibility={visibility} id={time} />
        <View style={styles.bottomContainer}>
          <View style={styles.deleteContainer}>
            <Pressable android_ripple={{color: '#d9d9d9'}} onPress={() =>  visibility(true)}>
              <MaterialIcons style={styles.icon} name='delete' size={40}/>
            </Pressable>
          </View>

          <View style={styles.editTimeContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.editTime, {fontFamily: 'SofiaProBold'}]}>Created at</Text>
              {/* <Text style={styles.editTime}>{zaman}</Text> */}
              <Text style={styles.editTime}>{zaman} - {tarih}</Text>
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
        // backgroundColor: '#FFFFFF',
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
      color: '#7c7c7c',
    },
})