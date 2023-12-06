import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/selectors'

export const FavouritesScreen = () => {
  const favourites = useReduxSelector(selectFavourites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(videosSlice.actions.fetch(favourites))
  }, [])

  return (
    <View>
      {favourites.length ? (
        favourites.map(fav => (
          <View key={fav}>
            <Text>{fav}</Text>
          </View>
        ))
      ) : (
        <Text>No favourites yet</Text>
      )}
    </View>
  )
}
