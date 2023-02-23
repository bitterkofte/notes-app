import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import IconButton from '../components/IconButton'

const User = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const collUser = collection(db, 'users');
  const q = query(collUser, where("email", "==", auth.currentUser.email))

  //GETTING USER DATA
  useEffect(() => {
    const subscriber = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          users.push({...doc.data(), id: doc.id});
        });
        setUsers(users);
        // console.log(users);
        console.log('5')
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [users]);

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
  const u = users[0];
  // const name1 = u.name.toUpperCase();
  // const email1 = u.email;
  return (
    <View style={styles.userContainer}>
      <IconButton size={70} />
      <Text style={styles.text}>{u.name.toUpperCase()}</Text>
      <Text style={styles.text}>{u.email}</Text>
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

  text: {
    fontFamily: 'Sofia',
    fontSize: 20,
    marginBottom: 10,
  },

  bc: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    justifyContent: 'space-between',
  }
})