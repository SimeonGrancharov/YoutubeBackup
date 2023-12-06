import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import { SearchLoader } from '../constants/loaders'
import { loadersSlice } from '../reducers/loaders'
import { searchSlice } from '../reducers/search'
import { videosSlice } from '../reducers/videos'
import { selectPagination, selectSearchResults } from '../selectors/search'
import { searchByQuery } from '../services/youtube'

function* onSearch(action: ReturnType<typeof searchSlice.actions.search>) {
  if (!action.payload) {
    // Delete the search items
    yield put(
      searchSlice.actions.setResults({
        videos: undefined,
        nextPageToken: undefined
      })
    )

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

    yield put(
      searchSlice.actions.setPagination(result.nextPageToken ?? undefined)
    )

    if (!searchResults) {
      yield put(searchSlice.actions.setResults(result.items))
    } else {
      yield put(searchSlice.actions.addResults(result.items))
    }

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
