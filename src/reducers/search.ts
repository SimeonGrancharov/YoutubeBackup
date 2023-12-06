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

const initialState: StateT = {
  isSearching: false,
  searchQuery: undefined,
  results: undefined,
  pagination: undefined
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (_, __: PayloadAction<string>) => {},
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setResults: (
      state,
      action: PayloadAction<{
        nextPageToken: string | undefined
        videos: BaseVideoT[] | undefined
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

      state.results = action.payload.videos?.map(v => v.id)
    },
    reset: () => initialState
  }
})
