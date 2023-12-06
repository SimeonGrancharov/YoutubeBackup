import { all, fork } from 'redux-saga/effects'
import { appStateSaga } from './appState'
import favouritesSaga from './favourites'
import searchSaga from './search'
import userSaga from './user'
import videosSaga from './videos'

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(appStateSaga),
    fork(searchSaga),
    fork(favouritesSaga),
    fork(videosSaga)
  ])
}
