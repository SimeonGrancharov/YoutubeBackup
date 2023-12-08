import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { call, delay, put } from 'redux-saga/effects'
import { appStateSlice } from '../reducers/appState'
import { userSlice } from '../reducers/user'

function* init() {
  try {
    yield put(appStateSlice.actions.setStatus('initializing'))

    GoogleSignin.configure({
      scopes: [`https://www.googleapis.com/auth/youtube`],
      iosClientId:
        '719318481645-ssoagvt5c2v1rm3hmsv3g1sqgova7vs9.apps.googleusercontent.com',
      webClientId:
        '719318481645-903hovl9tieh04rn719utgbbslnbsb86.apps.googleusercontent.com'
    })

    const isSignedIn: boolean = yield call(GoogleSignin.isSignedIn)

    if (!isSignedIn) {
      yield put(userSlice.actions.setIsLoggedIn(false))
    } else {
      yield put(userSlice.actions.logIn(true))
    }

    //Brief delay for a better experience
    yield delay(500)
  } catch (err) {
    console.log('appState init error', err)
  } finally {
    yield put(appStateSlice.actions.setStatus('ready'))
  }
}

export function* appStateSaga() {
  yield call(init)
}
