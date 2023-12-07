import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { favouritesSlice } from '../reducers/favourites'
import { searchSlice } from '../reducers/search'
import { userSlice } from '../reducers/user'
import { videosSlice } from '../reducers/videos'
import { setHeaders } from '../services/headers'

function* onLogIn(action: ReturnType<typeof userSlice.actions.logIn>) {
  try {
    // If logIn is called with true => make the silent login
    // else make the normal login through the flow
    if (action.payload) {
      yield call(GoogleSignin.signInSilently)
    } else {
      yield call(GoogleSignin.signIn)
    }

    const tokens: Awaited<ReturnType<typeof GoogleSignin.getTokens>> =
      yield call(GoogleSignin.getTokens)

    setHeaders({
      Authorization: `Bearer ${tokens.accessToken}`
    })

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

  yield put(searchSlice.actions.reset())
  yield put(videosSlice.actions.reset())
  yield put(favouritesSlice.actions.reset())
}

export default function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.logIn, onLogIn),
    takeLatest(userSlice.actions.logOut, onLogOut)
  ])
}
