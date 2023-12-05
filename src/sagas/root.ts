import { all, fork } from 'redux-saga/effects'
import { appStateSaga } from './appState'
import userSaga from './user'

export default function* rootSaga() {
  yield all([fork(userSaga), fork(appStateSaga)])
}
