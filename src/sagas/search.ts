import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import { SearchLoader } from '../constants/loaders'
import { loadersSlice } from '../reducers/loaders'
import { searchSlice } from '../reducers/search'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'
import {
  selectLastSearchQuery,
  selectPagination,
  selectSearchResults
} from '../selectors/search'
import { searchByQuery } from '../services/youtube'

function* onSearch(action: ReturnType<typeof searchSlice.actions.search>) {
  const lastSearchQuery: ReturnType<typeof selectLastSearchQuery> =
    yield select(selectLastSearchQuery)

  const isNewSearch = lastSearchQuery !== action.payload

  // Reset search results on Submit empty text
  if (!action.payload) {
    yield put(searchSlice.actions.setResults(undefined))
    return
  }

  try {
    yield put(loadersSlice.actions.startLoading(SearchLoader))

    const pagination: ReturnType<typeof selectPagination> = yield select(
      selectPagination
    )

    const result: Awaited<ReturnType<typeof searchByQuery>> = yield call(
      searchByQuery,
      action.payload,
      !isNewSearch ? pagination?.nextPageToken : undefined
    )

    const lastSearchResults: ReturnType<typeof selectSearchResults> =
      yield select(selectSearchResults)

    // If query has changed we always reset results with the new ones.
    // We assume that this is the first request for the new query
    if (isNewSearch) {
      // Check if there are prev results, delete old videos that ARE NOT in favourites
      if (lastSearchResults) {
        const favourites: ReturnType<typeof selectFavourites> = yield select(
          selectFavourites
        )

        yield put(
          videosSlice.actions.deleteVideos(
            lastSearchResults.filter(id => !favourites.includes(id))
          )
        )
      }

      yield put(searchSlice.actions.setResults(result.items ?? []))
    } else {
      // For some reason the YT API returns data that is previously returned
      // Check this =>> https://stackoverflow.com/questions/72438701/youtube-data-api-search-returning-repeating-items
      result.items = result.items?.filter(
        video => !lastSearchResults?.includes(video.id)
      )

      yield put(searchSlice.actions.addResults(result.items ?? []))
    }

    yield put(
      searchSlice.actions.setPagination(result.nextPageToken ?? undefined)
    )

    yield put(searchSlice.actions.setLastSearchQuery(action.payload))
    console.log(' /???? l', result)

    if (result.items) {
      yield put(videosSlice.actions.consumeVideos(result.items))
    }
  } catch (err) {
    console.log('Error searching: ', err)
    yield put(searchSlice.actions.setFetchFailed())
  } finally {
    yield put(loadersSlice.actions.stopLoading(SearchLoader))
  }
}

export default function* searchSaga() {
  yield all([takeLatest(searchSlice.actions.search, onSearch)])
}
