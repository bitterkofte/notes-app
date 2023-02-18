import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Notes from '../screens/Notes';
import ViewNote from '../screens/ViewNote';
import EditNote from '../screens/EditNote';
import AddNote from '../screens/AddNote';
import store from '../redux/store';

const NavigationCenter = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name='Notes' component={Notes} options={notesOptions} />
        <Stack.Screen name='ViewNote' component={ViewNote} options={viewNotesOptions} />
        <Stack.Screen name='EditNote' component={EditNote} options={editNotesOptions} />
        <Stack.Screen name='AddNote' component={AddNote} options={addNotesOptions} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}

export default NavigationCenter

const defaultOptions = {
  title: "My Notes",
  headerStyle: {backgroundColor: '#8bcee2'},
  headerTitleStyle: {fontFamily: 'SofiaProBold'},
}

const notesOptions = {
  contentStyle: {backgroundColor: '#c3f1ff'}
}

const viewNotesOptions = {
  title: "Details",
  headerStyle: {backgroundColor: '#8be2a8'},
  contentStyle: {backgroundColor: '#c3ffd0'}
}

const editNotesOptions = {
  title: "Editing...",
  headerStyle: {backgroundColor: '#cccccc'},
  contentStyle: {backgroundColor: '#f6f6f6'},
  animation: "fade",
  animationDuration: 900,
}

const addNotesOptions = {
  title: "Add a new note",
  headerStyle: {backgroundColor: '#b28be2'},
  contentStyle: {backgroundColor: '#dec3ff'}
}

const styles = StyleSheet.create({})