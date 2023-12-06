import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'
import { VideoTile } from './VideoTile'

export const FavouritesScreen = () => {
  const favourites = useReduxSelector(selectFavourites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(videosSlice.actions.fetch(favourites))
  }, [])

  return (
    <View>
      {favourites.length ? (
        favourites.map(fav => <VideoTile key={fav} id={fav} />)
      ) : (
        <Text>No favourites yet</Text>
      )}
    </View>
  )
}
