import React, { useCallback, useEffect } from 'react'
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { FavouriteVideosLoader } from '../constants/loaders'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { videosSlice } from '../reducers/videos'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { Empty } from './Empty'
import { Loading } from './Loading'
import { VideoTile } from './VideoTile'

type ItemT = BaseVideoT['id']

export const FavouritesScreen = () => {
  const favourites = useReduxSelector(selectFavourites)
  const fetchVideos = useReduxAction(videosSlice.actions.fetch)
  const isFetchingFavourites = useReduxSelector(
    state => state.loaders.loadersById[FavouriteVideosLoader]
  )

  useEffect(() => {
    fetchVideos({
      videos: favourites,
      loader: FavouriteVideosLoader
    })
  }, [])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ItemT>) => (
      <VideoTile id={item} includeMetadata />
    ),
    []
  )
  return (
    <View style={styles.mainContainer}>
      {!isFetchingFavourites ? (
        <FlatList<ItemT>
          data={favourites}
          renderItem={renderItem}
          ListEmptyComponent={
            <Empty text="Nothing here yet. Go and add your first video from Search" />
          }
          keyExtractor={item => item}
        />
      ) : (
        <Loading />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  }
})
