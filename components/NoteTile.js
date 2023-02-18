import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const NoteTile = ({title, det, pressFunc}) => {
    const { color } = useSelector((state) => state.colorizer);
    // const color = useSelector((state) => state.colorizer.color);
  return (
    <View style={[styles.tileContainer, {backgroundColor: color.bg}]} >
        <Pressable  android_ripple={{color: '#cccccc'}} 
                    style={styles.button}
                    onPress={pressFunc} >
            <View style={[styles.innerContainer]} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.details} >{det}</Text>
            </View>
        </Pressable>
    </View>
  )
}

export default NoteTile

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
        margin: 10,
        height: 100,
        maxHeight: 400,
        borderRadius: 30,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: '#ffffff'
        // backgroundColor: color.bg,
    },

    button: {
        flex: 1,
    },

    innerContainer: {
        flex: 1,
        // maxHeight: 400,
        padding: 16,
        borderRadius: 30,
    },

    title: {
        fontFamily: 'SofiaProBold',
        fontSize: 15,
    },
    details: {
        // maxHeight: 400,
    }
})