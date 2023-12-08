import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  favourites: BaseVideoT['id'][]
  fetchFailed: boolean
}

const initialState: StateT = {
  favourites: [],
  fetchFailed: false
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    fetch: () => {},
    setFavourites: (
      state,
      action: PayloadAction<BaseVideoT['id'][] | undefined>
    ) => {
      state.favourites = action.payload ?? []
    },

    requestAddFavourite: (_, __: PayloadAction<BaseVideoT['id']>) => {},

    addFavourite: (state, action: PayloadAction<BaseVideoT['id']>) => {
      // Sort them from newest
      state.favourites.unshift(action.payload)
    },
    removeFavourite: (state, action: PayloadAction<BaseVideoT['id']>) => {
      state.favourites = state.favourites.filter(id => id !== action.payload)
    },

    setFetchFailed: (state, action: PayloadAction<boolean>) => {
      state.fetchFailed = action.payload
    },

    reset: () => initialState
  }
})
