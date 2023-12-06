import { all, call, put, takeLatest } from 'redux-saga/effects'
import { SearchLoader } from '../constants/loaders'
import { loadersSlice } from '../reducers/loaders'
import { searchSlice } from '../reducers/search'
import { videosSlice } from '../reducers/videos'
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
    const result: Awaited<ReturnType<typeof searchByQuery>> = yield call(
      searchByQuery,
      action.payload
    )

    yield put(
      searchSlice.actions.setResults({
        videos: result.items,
        nextPageToken: result.nextPageToken ?? undefined
      })
    )

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
