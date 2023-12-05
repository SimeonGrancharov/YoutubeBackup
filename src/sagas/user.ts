import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { favouritesSlice } from '../reducers/favourites'
import { userSlice } from '../reducers/user'

function* onLogIn(action: ReturnType<typeof userSlice.actions.logIn>) {
  try {
    // If logIn is called with true => make the silent login
    // else make the normal login through the flow
    if (action.payload) {
      yield call(GoogleSignin.signInSilently)
    } else {
      yield call(GoogleSignin.signIn)
    }

    // Init favourites. It must not be blocking. That's why the fork
    yield fork(function* () {
      try {
        const userInfo: User | null = yield call(GoogleSignin.getCurrentUser)

        if (!userInfo) {
          return
        }

        const data: string | null = yield call(
          AsyncStorage.getItem,
          userInfo.user.id
        )

        if (!data) {
          return
        }

        yield put(
          favouritesSlice.actions.setFavourites(JSON.parse(data)?.favourites)
        )
      } catch (err: any) {}
    })

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
