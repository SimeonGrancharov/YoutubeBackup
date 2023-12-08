import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseVideoT } from '../types/Video'

type StateT = {
  isSearching: boolean
  lastSearchQuery: string | undefined
  results: BaseVideoT['id'][] | undefined
  fetchFailed: boolean
  pagination:
    | {
        nextPageToken: string
      }
    | undefined
}

const initialState: StateT = {
  isSearching: false,
  lastSearchQuery: undefined,
  results: undefined,
  pagination: undefined,
  fetchFailed: false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: () => {},
    setLastSearchQuery: (state, action: PayloadAction<string>) => {
      state.lastSearchQuery = action.payload
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setFetchFailed: state => {
      state.fetchFailed = true
    },
    setPagination: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        if (!state.pagination) {
          state.pagination = {
            nextPageToken: action.payload
          }
        } else {
          state.pagination.nextPageToken = action.payload
        }
      } else {
        state.pagination = undefined
      }
    },
    addResults: (state, action: PayloadAction<BaseVideoT[]>) => {
      state.results?.push(...action.payload.map(v => v.id))
    },
    setResults: (state, action: PayloadAction<BaseVideoT[] | undefined>) => {
      state.results = action.payload?.map(v => v.id)
      state.fetchFailed = false
    },
    reset: () => initialState
  }
})
