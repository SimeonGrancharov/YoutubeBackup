import { all, takeLatest } from 'redux-saga/effects'
import { userSlice } from '../reducers/user'

function* onLoggedIn(
  action: ReturnType<typeof userSlice.actions.setIsLoggedIn>
) {}

export default function* userSaga() {
  yield all([takeLatest(userSlice.actions.setIsLoggedIn.type, onLoggedIn)])
}
