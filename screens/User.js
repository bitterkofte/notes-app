import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { auth, db, collUser } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import IconButton from '../components/IconButton'

const User = ({navigation, route}) => {
  const {user} =  route.params;
  //SIGN OUT
  function signOutHandler() {
    signOut(auth)
    .then(() => {
      console.log('user signed out')
      navigation.navigate('SignIn')
    })
    .catch(err => {
      // console.log(err.message)
    })
  }

  let label = user.name;
  // console.log(user)
  // label = 'hasan'
  label = label.charAt(0).toUpperCase() + label.slice(1);

  let email = user.email;
  // email = 'hasan@gmail.com'

  let arr = user.notes;
  // arr=[1,2,3,4,5,6,7,8];
  let length = arr.length

  return (
    <View style={styles.userContainer}>
      <View style={styles.bio}>
        <IconButton name="account-circle" size={70} style={styles.pp} />
        <View style={styles.cred}>
          <Text style={[styles.text, {marginBottom: 4, fontSize: 18}]}>{label}</Text>
          <Text style={[styles.text, {color: '#565656'}]}>{email}</Text>
        </View>
      </View>
      <Text style={[styles.text, {marginTop: 20}]}>You have currently <Text style={styles.bold}>{length}</Text> notes.</Text>
      
      <View style={styles.bc}>
        <Button title='Delete Account' color={'red'} onPress={signOutHandler} />
        <Button title='Sign Out' onPress={signOutHandler} />
      </View>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  userContainer:{
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  bio: {
    flexDirection: 'row',
    width: '90%',
    paddingHorizontal: 5,
    alignItems: 'center',
    // backgroundColor: '#eeeeee',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
  },

  pp: {

  },
  cred: {
    marginLeft: 20,
    // justifyContent: 'center',
  },

  text: {
    fontFamily: 'Sofia',
    fontSize: 15,
    // marginBottom: 10,
  },
  bold: {
    fontFamily: 'SofiaProBold',
  },

  bc: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    justifyContent: 'space-between',
  }
})