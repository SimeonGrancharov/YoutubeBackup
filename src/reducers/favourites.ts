import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  favourites: BaseVideoT['id'][]
}

const initialState: StateT = {
  favourites: []
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
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
    reset: () => initialState
  }
})
