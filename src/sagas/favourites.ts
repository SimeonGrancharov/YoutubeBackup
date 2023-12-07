import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { MaxFavourites } from '../constants/utils'
import { favouritesSlice } from '../reducers/favourites'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'

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

function* onFavouriteAdded(
  action: ReturnType<typeof favouritesSlice.actions.addFavourite>
) {
  yield put(videosSlice.actions.fetch({ videos: [action.payload] }))
}

function* onRequestAddFavourite(
  action: ReturnType<typeof favouritesSlice.actions.requestAddFavourite>
) {
  const favourites: ReturnType<typeof selectFavourites> = yield select(
    selectFavourites
  )

  if (favourites?.length > MaxFavourites) {
    Alert.alert('Not possible', 'Max number of favourites reached')
    return
  }

  yield put(favouritesSlice.actions.addFavourite(action.payload))
}

export default function* favouritesSaga() {
  yield all([
    takeLatest(favouritesSlice.actions.addFavourite, onFavouriteAdded),
    takeLatest(
      [
        favouritesSlice.actions.addFavourite,
        favouritesSlice.actions.removeFavourite
      ],
      onFavouritesChanged
    ),
    takeLatest(
      favouritesSlice.actions.requestAddFavourite,
      onRequestAddFavourite
    )
  ])
}
