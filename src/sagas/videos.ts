import { all, call, put, takeLatest } from 'redux-saga/effects'
import { videosSlice } from '../reducers/videos'
import { fetchVideos } from '../services/youtube'

function* onFetch(action: ReturnType<typeof videosSlice.actions.fetch>) {
  try {
    const videos: Awaited<ReturnType<typeof fetchVideos>> = yield call(
      fetchVideos,
      action.payload
    )

    yield put(videosSlice.actions.consumeVideos(videos.items ?? []))
  } catch (err: any) {
    console.log('fetchVideos failed: ', err)
  }
}

export default function* videosSaga() {
  yield all([takeLatest(videosSlice.actions.fetch, onFetch)])
}
