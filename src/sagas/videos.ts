import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loadersSlice } from '../reducers/loaders'
import { videosSlice } from '../reducers/videos'
import { fetchVideos } from '../services/youtube'

function* onFetch(action: ReturnType<typeof videosSlice.actions.fetch>) {
  const loader = action.payload.loader

  if (loader) {
    yield put(loadersSlice.actions.startLoading(loader))
  }

  try {
    const videos: Awaited<ReturnType<typeof fetchVideos>> = yield call(
      fetchVideos,
      action.payload.videos
    )

    yield put(videosSlice.actions.consumeVideos(videos.items ?? []))
  } catch (err: any) {
    console.log('fetchVideos failed: ', err)
  } finally {
    if (loader) {
      yield put(loadersSlice.actions.stopLoading(loader))
    }
  }
}

export default function* videosSaga() {
  yield all([takeLatest(videosSlice.actions.fetch, onFetch)])
}
