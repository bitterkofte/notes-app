import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons'; 

const Picker = ({changeOrder}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Title', value: 'titleA', icon: () => <AntDesign name="arrowup" size={20} color="black" />},
    {label: 'Title', value: 'titleD', icon: () => <AntDesign name="arrowdown" size={20} color="black" />},
    {label: 'Time', value: 'timeA', icon: () => <AntDesign name="arrowup" size={20} color="black" />},
    {label: 'Time', value: 'timeD', icon: () => <AntDesign name="arrowdown" size={20} color="black" />},
  ]);

  useEffect(() => {
    changeOrder(value);
  }, [value]);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Sort by..."
        placeholderStyle={{
          fontFamily: 'SofiaProBold',
        }}
        style={styles.picker}
        textStyle={{
          fontSize: 16,
          fontFamily: 'Sofia'
        }}
        labelStyle={{
          // fontWeight: "bold"
          // borderWidth: 0,
        }}
        listItemContainer={{
          height: 100
        }}
        dropDownContainerStyle={{
          // backgroundColor: "#b35252",
          borderWidth: 0,
          elevation: 3,
        }}
        selectedItemContainerStyle={{
          backgroundColor: "#d1f4ff"
          // borderWidth: 1,
        }}
      />
    </View>
  )
}

export default Picker

const styles = StyleSheet.create({
  picker: {
    // width: '40%',
    borderWidth: 0,
    elevation: 3,
    // backgroundColor: '#f5edff'
  },
})