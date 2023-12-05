import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './user'

export const rootReducer = combineReducers({
  user: userSlice.reducer
})
