import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  // favouriteVideoIds
  videosById: Record<BaseVideoT['id'], BaseVideoT>
}

const initialState: StateT = {
  videosById: {}
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    consumeVideos: (state, action: PayloadAction<BaseVideoT[]>) => {
      action.payload.forEach(video => {
        state.videosById[video.id] = video
      })
    },
    fetch: (_, __: PayloadAction<BaseVideoT['id'][]>) => {},
    reset: () => initialState
  }
})
