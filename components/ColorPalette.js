import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { green, red, yellow, orange, pink } from '../redux/reducers/colorPick'
import ColorThemes from '../assets/themes/ColorThemes'

const ColorPalette = () => {
  const { color } = useSelector((state) => state.colorizer);
  const dispatch = useDispatch();
  // console.log(color.nav);
  return (
    <View style={styles.paletteContainer}>
      <Pressable style={[styles.color, {backgroundColor: ColorThemes.myYellowL}]} android_ripple={{color: '#d9d9d9'}} onPress={() => dispatch(yellow())} />
      <Pressable style={[styles.color, {backgroundColor: ColorThemes.myRedL}]} android_ripple={{color: '#d9d9d9'}} onPress={() => dispatch(red())} />
      <Pressable style={[styles.color, {backgroundColor: ColorThemes.myGreenL}]} android_ripple={{color: '#d9d9d9'}} onPress={() => dispatch(green())} />
      <Pressable style={[styles.color, {backgroundColor: ColorThemes.myPinkL}]} android_ripple={{color: '#d9d9d9'}} onPress={() => dispatch(pink())} />
      <Pressable style={[styles.color, {backgroundColor: ColorThemes.myOrangeL}]} android_ripple={{color: '#d9d9d9'}} onPress={() => dispatch(orange())} />
      {/* <View style={{backgroundColor: color.nav, width:20}}></View>
      <View style={{backgroundColor: color.bg, width:20}}></View> */}
    </View>
  )
}

export default ColorPalette

const styles = StyleSheet.create({
  paletteContainer:{
    width: 250,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#717171',
    borderRadius: 25,
    elevation: 5,
  },

  color:{
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    overflow: 'hidden',
  },

})