import { all, fork } from 'redux-saga/effects'
import { appStateSaga } from './appState'
import searchSaga from './search'
import userSaga from './user'

export default function* rootSaga() {
  yield all([fork(userSaga), fork(appStateSaga), fork(searchSaga)])
}
