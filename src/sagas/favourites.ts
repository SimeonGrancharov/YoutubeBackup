import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { FavouriteVideosLoader } from '../constants/loaders'
import { MaxFavourites } from '../constants/utils'
import { favouritesSlice } from '../reducers/favourites'
import { loadersSlice } from '../reducers/loaders'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'
import { fetchAndConsumeVideos } from './videos'

function* onFetch() {
  yield put(loadersSlice.actions.startLoading(FavouriteVideosLoader))

  try {
    const videoIds: ReturnType<typeof selectFavourites> = yield select(
      selectFavourites
    )

    yield delay(2000)

    yield call(fetchAndConsumeVideos, videoIds)
    yield put(favouritesSlice.actions.setFetchFailed(false))
  } catch (err) {
    console.log('Error fetching favourite videos ', err)
    yield put(favouritesSlice.actions.setFetchFailed(true))
  } finally {
    yield put(loadersSlice.actions.stopLoading(FavouriteVideosLoader))
  }
}

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
    ),
    takeLatest(favouritesSlice.actions.fetch, onFetch)
  ])
}
