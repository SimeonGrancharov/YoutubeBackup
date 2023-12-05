import { combineReducers } from '@reduxjs/toolkit'
import { appStateSlice } from './appState'
import { userSlice } from './user'

export const rootReducer = combineReducers({
  appState: appStateSlice.reducer,
  user: userSlice.reducer
})
