import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  favourites: BaseVideoT['id'][]
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: []
  } as StateT,
  reducers: {
    setFavourites: (
      state,
      action: PayloadAction<BaseVideoT['id'][] | undefined>
    ) => {
      state.favourites = action.payload ?? []
    },
    addFavourite: (state, action: PayloadAction<BaseVideoT['id']>) => {
      // Sort them from newest
      state.favourites.unshift(action.payload)
    },
    removeFavourite: (state, action: PayloadAction<BaseVideoT['id']>) => {
      state.favourites = state.favourites.filter(id => id !== action.payload)
    }
  }
})
