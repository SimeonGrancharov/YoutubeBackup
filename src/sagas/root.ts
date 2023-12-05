import { all, fork } from 'typed-redux-saga/macro'
import userSaga from './user'

export default function* rootSaga() {
  yield* all([fork(userSaga)])
}
