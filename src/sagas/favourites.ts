import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { all, call, select, takeLatest } from 'redux-saga/effects'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/selectors'

function* onFavouritesChanged() {
  const favourites: ReturnType<typeof selectFavourites> = yield select(
    selectFavourites
  )

  try {
    const userInfo: User | null = yield call(GoogleSignin.getCurrentUser)

    if (!userInfo) {
      return
    }

    yield call(
      AsyncStorage.setItem,
      userInfo.user.id,
      JSON.stringify({ favourites })
    )
  } catch (err) {
    console.log('>>>>>>>>> err ', err)
  }
}

export default function* favouritesSaga() {
  yield all([
    takeLatest(
      [
        favouritesSlice.actions.addFavourite,
        favouritesSlice.actions.removeFavourite
      ],
      onFavouritesChanged
    )
  ])
}
