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
    deleteVideos: (state, action: PayloadAction<BaseVideoT['id'][]>) => {
      for (const id of action.payload) {
        delete state.videosById[id]
      }
    },
    fetch: (
      _,
      __: PayloadAction<{ videos: BaseVideoT['id'][]; loader?: string }>
    ) => {},
    reset: () => initialState
  }
})
