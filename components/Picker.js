import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const Picker = ({changeOrder}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Title Asc.', value: 'titleA'},
    {label: 'Title Des.', value: 'titleD'},
    {label: 'Time Asc.', value: 'timeA'},
    {label: 'Time Des.', value: 'timeD'},
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
        style={styles.picker}
        textStyle={{
          fontSize: 16,
          fontFamily: 'Sofia'
        }}
        // containerStyle={styles.container}
        // disabledStyle={{
        //   opacity: 0.5
        // }}
        labelStyle={{
          // fontWeight: "bold"
          // borderWidth: 0,
        }}
      />
    </View>
  )
}

export default Picker

const styles = StyleSheet.create({
  picker: {
    borderWidth: 0,
    elevation: 3,
    backgroundColor: '#f5edff'
  },
  container: {
    borderWidth: 0,
    backgroundColor: '#9b4ff9'
  }
})