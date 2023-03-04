import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

const IconButton = ({onPress, size, name}) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <MaterialIcons name={name} size={size} color="black" />
      </Pressable>
    </View>
  )
}

export default IconButton

const styles = StyleSheet.create({})