import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { FavouriteVideosLoader } from '../constants/loaders'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { Empty } from './Empty'
import { Loading } from './Loading'
import { VideoTile } from './VideoTile'

type ItemT = BaseVideoT['id']

export const FavouritesScreen = React.memo(() => {
  // favourites -> string[]

  const isFetchingFavourites = useReduxSelector(
    state => state.loaders.loadersById[FavouriteVideosLoader]
  )

  const hasFetchFailed = useReduxSelector(state => state.favourites.fetchFailed)
  const favourites = useReduxSelector(selectFavourites)
  const [data, setData] = useState<BaseVideoT['id'][]>(favourites)

  const fetchFavourites = useReduxAction(favouritesSlice.actions.fetch)

  const isFocused = useIsFocused()

  useEffect(() => {
    // Explanation:
    //
    // Updates on the the list must happen when the tab is not focused, because
    // when removing from favs, we want to preserve the item in the list for better UX
    //
    // If in some case the list is focused and new item has been added -> update. This is currently not possible tho
    if (!isFocused || data.length < favourites.length) {
      setData(favourites)
    }
  }, [favourites, isFocused])

  useEffect(() => {
    if (favourites.length) {
      fetchFavourites()
    }
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
          data={!hasFetchFailed ? data : null}
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
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  }
})
