import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { userSlice } from '../reducers/user'

function* onLogIn() {
  try {
    yield call(GoogleSignin.signIn)

    yield put(userSlice.actions.setIsLoggedIn(true))
  } catch (err) {
    console.log("Couldn't log in ", err)
  }
}

function* onLogOut() {
  yield call(GoogleSignin.signOut)
  yield put(userSlice.actions.setIsLoggedIn(false))
}

export default function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.logIn, onLogIn),
    takeLatest(userSlice.actions.logOut, onLogOut)
  ])
}
