import React, { useCallback, useEffect } from 'react'
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { FavouriteVideosLoader } from '../constants/loaders'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { useStateToRender } from '../hooks/useStateToRender'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { Empty } from './Empty'
import { Loading } from './Loading'
import { VideoTile } from './VideoTile'

type ItemT = BaseVideoT['id']

export const FavouritesScreen = () => {
  const favourites = useReduxSelector(selectFavourites)
  const fetchFavourites = useReduxAction(favouritesSlice.actions.fetch)
  const isFetchingFavourites = useReduxSelector(
    state => state.loaders.loadersById[FavouriteVideosLoader]
  )
  const hasFetchFailed = useReduxSelector(state => state.favourites.fetchFailed)

  useEffect(() => {
    fetchFavourites()
  }, [])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ItemT>) => (
      <VideoTile id={item} includeMetadata />
    ),
    []
  )

  const onRefresh = useCallback(() => {
    if (!hasFetchFailed) {
      return
    }

    fetchFavourites()
  }, [hasFetchFailed])

  return (
    <View style={styles.mainContainer}>
      {isFetchingFavourites && !hasFetchFailed ? (
        <Loading />
      ) : (
        <FlatList<ItemT>
          data={!hasFetchFailed ? favourites : null}
          renderItem={renderItem}
          ListEmptyComponent={
            hasFetchFailed ? (
              <Empty text="Oh snap, something went wrong. Pull down to retry" />
            ) : (
              <Empty text="Nothing here yet. Go and add your first video from Search" />
            )
          }
          keyExtractor={item => item}
          onRefresh={onRefresh}
          refreshing={Boolean(hasFetchFailed && isFetchingFavourites)}
        />
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
