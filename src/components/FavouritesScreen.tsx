import React, { useCallback, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native'
import { useDispatch } from 'react-redux'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { Empty } from './Empty'
import { VideoTile } from './VideoTile'

type ItemT = BaseVideoT['id']

export const FavouritesScreen = () => {
  const favourites = useReduxSelector(selectFavourites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(videosSlice.actions.fetch(favourites))
  }, [])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ItemT>) => (
      <VideoTile id={item} includeMetadata />
    ),
    []
  )
  return (
    <View style={styles.mainContainer}>
      <FlatList<ItemT>
        data={favourites}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty text="Nothing here yet. Go and add your first video from Search" />
        }
        keyExtractor={item => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  }
})
