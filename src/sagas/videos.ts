import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loadersSlice } from '../reducers/loaders'
import { videosSlice } from '../reducers/videos'
import { fetchVideos } from '../services/youtube'
import { BaseVideoT } from '../types/Video'

export function* fetchAndConsumeVideos(
  videos: BaseVideoT['id'][]
): Generator<any, BaseVideoT[], any> {
  const result: Awaited<ReturnType<typeof fetchVideos>> = yield call(
    fetchVideos,
    videos
  )

  yield put(videosSlice.actions.consumeVideos(result.items ?? []))

  return result.items ?? []
}

function* onFetch(action: ReturnType<typeof videosSlice.actions.fetch>) {
  const loader = action.payload.loader

  if (loader) {
    yield put(loadersSlice.actions.startLoading(loader))
  }

  try {
    yield call(fetchAndConsumeVideos, action.payload.videos)
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
