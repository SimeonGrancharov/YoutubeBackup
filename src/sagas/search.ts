import { all, call, put, takeLatest } from 'redux-saga/effects'
import { searchSlice } from '../reducers/search'
import { videosSlice } from '../reducers/videos'
import { searchByQuery } from '../services/youtube'

function* onSearch(action: ReturnType<typeof searchSlice.actions.search>) {
  try {
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
  }
}

export default function* searchSaga() {
  yield all([takeLatest(searchSlice.actions.search, onSearch)])
}
