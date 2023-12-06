import { combineReducers } from '@reduxjs/toolkit'
import { appStateSlice } from './appState'
import { favouritesSlice } from './favourites'
import { loadersSlice } from './loaders'
import { searchSlice } from './search'
import { userSlice } from './user'
import { videosSlice } from './videos'

export const rootReducer = combineReducers({
  appState: appStateSlice.reducer,
  user: userSlice.reducer,
  search: searchSlice.reducer,
  videos: videosSlice.reducer,
  favourites: favouritesSlice.reducer,
  loaders: loadersSlice.reducer
})
