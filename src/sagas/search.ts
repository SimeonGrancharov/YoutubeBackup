import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import { SearchLoader } from '../constants/loaders'
import { loadersSlice } from '../reducers/loaders'
import { searchSlice } from '../reducers/search'
import { videosSlice } from '../reducers/videos'
import {
  selectLastSearchQuery,
  selectPagination,
  selectSearchResults
} from '../selectors/search'
import { searchByQuery } from '../services/youtube'

function* onSearch(action: ReturnType<typeof searchSlice.actions.search>) {
  const lastSearchQuery: ReturnType<typeof selectLastSearchQuery> =
    yield select(selectLastSearchQuery)

  // Reset the pagination on query changed. Best case will be to
  // reset the results as well. But because of UX we want to preserve
  // them while searching
  if (lastSearchQuery !== action.payload) {
    yield put(searchSlice.actions.setPagination(undefined))
  }

  // Reset search results
  if (!action.payload) {
    yield put(searchSlice.actions.setResults(undefined))
    return
  }

  try {
    yield put(loadersSlice.actions.startLoading(SearchLoader))
    // Dummy but ... yield
    const pagination: ReturnType<typeof selectPagination> = yield select(
      selectPagination
    )

    const result: Awaited<ReturnType<typeof searchByQuery>> = yield call(
      searchByQuery,
      action.payload,
      pagination?.nextPageToken
    )

    const searchResults: ReturnType<typeof selectSearchResults> = yield select(
      selectSearchResults
    )

    // For some reason the YT API returns data that is previously returned
    // Check this =>> https://stackoverflow.com/questions/72438701/youtube-data-api-search-returning-repeating-items
    result.items = result.items.filter(
      video => !searchResults?.includes(video.id)
    )

    if (!searchResults || action.payload !== lastSearchQuery) {
      yield put(searchSlice.actions.setResults(result.items))
    } else {
      yield put(searchSlice.actions.addResults(result.items))
    }

    yield put(
      searchSlice.actions.setPagination(result.nextPageToken ?? undefined)
    )

    yield put(searchSlice.actions.setLastSearchQuery(action.payload))

    yield put(videosSlice.actions.consumeVideos(result.items))

    console.log(JSON.stringify(result))
  } catch (err) {
    console.log('>>>>>>>>> err ', err)
  } finally {
    yield put(loadersSlice.actions.stopLoading(SearchLoader))
  }
}

export default function* searchSaga() {
  yield all([takeLatest(searchSlice.actions.search, onSearch)])
}
