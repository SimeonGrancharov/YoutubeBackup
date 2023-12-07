import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
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
        let currentVideo = state.videosById[video.id]

        if (currentVideo) {
          currentVideo = {
            ...currentVideo,
            ...video,
            // Weirdo but search videos don't include these two props.
            // When new data for video that is both in search and in favourites
            // come, we want to preserve these two properties ¯\_(ツ)_/¯
            tags: video.tags ?? currentVideo.tags,
            stats: video.stats ?? currentVideo.stats
          }
        } else {
          currentVideo = video
        }

        state.videosById[video.id] = currentVideo
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
