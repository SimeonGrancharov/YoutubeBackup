import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppStatusT = 'not-ready' | 'initializing' | 'ready'

type StateT = {
  status: AppStatusT
}

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    status: 'not-ready'
  } as StateT,
  reducers: {
    setStatus: (state, action: PayloadAction<AppStatusT>) => {
      console.log('??? ', action.payload)
      state.status = action.payload
    }
  }
})
