import { configureStore } from '@reduxjs/toolkit'
import colorizerReducer from './reducers/colorPick'

export default configureStore({
  reducer: {
    colorizer: colorizerReducer,
  }
})