import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { addDoc } from 'firebase/firestore';
import { db, colRef } from './firebase';

import Notes from './screens/Notes';
import ViewNote from './screens/ViewNote';
import EditNote from './screens/EditNote';
import AddNote from './screens/AddNote';
import store from './redux/store';
import SignIn from './screens/SignIn';
import IconButton from './components/IconButton';
import User from './screens/User';
// import NavigationCenter from './components/NavigationCenter';

export default function App() {
  //FONTS
  const [fontsLoaded] = useFonts({
    'Sofia': require('./assets/fonts/Sofia-Pro-Regular.otf'),
    'SofiaProBold': require('./assets/fonts/Sofia-Pro-Bold.otf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  //FONTS
  
  // const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name='SignIn' component={SignIn} options={{title: "Sign In",
          headerShown: false}} />
        <Stack.Screen name='User' component={User} options={userOptions} />
        <Stack.Screen name='Notes' component={Notes} options={notesOptions} />
        <Stack.Screen name='ViewNote' component={ViewNote} options={viewNotesOptions} />
        <Stack.Screen name='EditNote' component={EditNote} options={editNotesOptions} />
        <Stack.Screen name='AddNote' component={AddNote} options={addNotesOptions} />
      </Stack.Navigator>
    </NavigationContainer>
      {/* <NavigationCenter /> */}
    </Provider>
  );
}

const defaultOptions = {
  title: "My Notes",
  headerStyle: {backgroundColor: '#8bcee2'},
  headerTitleStyle: {fontFamily: 'SofiaProBold'},
}

const userOptions ={
  title: "User Settings",
  animation: "fade",
  headerStyle: {backgroundColor: '#fcff51'},
  contentStyle: {backgroundColor: '#fff6b4'},
}

const notesOptions = {
  contentStyle: {backgroundColor: '#c3f1ff'},
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

const styles = StyleSheet.create({
  
});
