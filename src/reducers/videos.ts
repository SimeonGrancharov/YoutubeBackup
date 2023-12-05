import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  // favouriteVideoIds
  videosById: Record<BaseVideoT['id'], BaseVideoT>
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    videosById: {}
  } as StateT,
  reducers: {
    consumeVideos: (state, action: PayloadAction<BaseVideoT[]>) => {
      action.payload.forEach(video => {
        state.videosById[video.id] = video
      })
    }
  }
})
