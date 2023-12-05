import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateT = {
  isLoggedIn: boolean
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false
  } as StateT,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    logIn: (_, __: PayloadAction<boolean>) => {},
    logOut: () => {}
  }
})
