import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  isSearching: boolean
  searchQuery: string | undefined
  results: BaseVideoT['id'][] | undefined
  pagination:
    | {
        nextPageToken: string
      }
    | undefined
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isSearching: false,
    searchQuery: undefined,
    results: undefined,
    pagination: undefined
  } as StateT,
  reducers: {
    search: (_, __: PayloadAction<string>) => {},
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setResults: (
      state,
      action: PayloadAction<{
        nextPageToken: string | undefined
        videos: BaseVideoT[]
      }>
    ) => {
      if (action.payload.nextPageToken) {
        if (!state.pagination) {
          state.pagination = {
            nextPageToken: action.payload.nextPageToken
          }
        } else {
          state.pagination.nextPageToken = action.payload.nextPageToken
        }
      } else {
        state.pagination = undefined
      }

      state.results = action.payload.videos.map(v => v.id)
    }
  }
})

/**
 *
 * videos: {
 *  videosById:  {
 *    [VideoId]:  {
 *      title,
 *      description,
 *      thumbnail,
 *      metadata // only if coming from api/videos
 *    }
 *  }
 * }
 *
 * search: {
 *  results: VideoId[]
 * }
 *
 * // search reuslts => onPress => video screen => renderMetadata()
 *
 * */
