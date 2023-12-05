import { all, takeLatest } from 'typed-redux-saga/macro'
import { userSlice } from '../reducers/user'

function* onLoggedIn(
  action: ReturnType<typeof userSlice.actions.setIsLoggedIn>
) {
  console.log(action.payload)
  console.log('Hello / ')
}

export default function* userSaga() {
  yield* all([takeLatest(userSlice.actions.setIsLoggedIn.type, onLoggedIn)])
}
