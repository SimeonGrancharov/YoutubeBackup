import React, { useCallback } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { SearchInput } from './SearchInput'
import { BaseVideoT } from '../types/Video'
import { SearchResult } from './SearchResult'
import { SearchLoader } from '../constants/loaders'
import { Loading } from './Loading'
import { Empty } from './Empty'

type ItemT = BaseVideoT['id']

export const SearchScreen = () => {
  const searchResults = useReduxSelector(state => state.search.results)
  const isLoading = useReduxSelector(
    state => state.loaders.loadersById[SearchLoader]
  )

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ItemT>) => {
    return <SearchResult videoId={item} />
  }, [])

  return (
    <View style={styles.mainContainer}>
      <SearchInput />
      {!searchResults && isLoading ? <Loading /> : null}
      {searchResults !== undefined ? (
        <FlatList<ItemT>
          data={searchResults}
          style={styles.resultsMainContainer}
          contentContainerStyle={styles.resultsContainer}
          renderItem={renderItem}
          ListEmptyComponent={<Empty text="Nothing to show" />}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  resultsMainContainer: {
    flex: 1
  },
  resultsContainer: {
    paddingHorizontal: 5
  }
})
