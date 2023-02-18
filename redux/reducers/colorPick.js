import { createSlice } from '@reduxjs/toolkit'
import ColorThemes from '../../assets/themes/ColorThemes'

export const colorizerSlice = createSlice({
  name: 'colorizer',
  initialState: {
    color: { nav: ColorThemes.myWhiteD,
             bg:  ColorThemes.myWhiteL}
  },
  reducers: {
    yellow: state => {
      state.color = { nav: ColorThemes.myYellowD,
                      bg: ColorThemes.myYellowL }
    },
    red: state => {
      state.color = { nav: ColorThemes.myRedD,
                      bg: ColorThemes.myRedD }
    },
    green: state => {
      state.color = { nav: ColorThemes.myGreenD,
                      bg: ColorThemes.myGreenL }
    },
    pink: state => {
      state.color = { nav: ColorThemes.myPinkD,
                      bg: ColorThemes.myPinkL }
    },
    orange: state => {
      state.color = { nav: ColorThemes.myOrangeD,
                      bg: ColorThemes.myOrangeL }
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  }
})

// Action creators are generated for each case reducer function
export const { yellow,
               red,
               green,
               pink,
               orange, } = colorizerSlice.actions

export default colorizerSlice.reducer