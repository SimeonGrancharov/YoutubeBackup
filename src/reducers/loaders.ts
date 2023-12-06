import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateT = {
  loadersById: Record<string, true>
}
const initialState: StateT = {
  loadersById: {}
}

export const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state.loadersById[action.payload] = true
    },

    stopLoading: (state, action: PayloadAction<string>) => {
      delete state.loadersById[action.payload]
    }
  }
})
