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
import { useReduxAction } from '../hooks/useReduxAction'
import { searchSlice } from '../reducers/search'
import {
  selectLastSearchQuery,
  selectPagination,
  selectSearchResults
} from '../selectors/search'
import { useStateToRender } from '../hooks/useStateToRender'

type ItemT = BaseVideoT['id']

export const SearchScreen = () => {
  const searchResults = useReduxSelector(selectSearchResults)
  const searchQuery = useReduxSelector(selectLastSearchQuery)
  const hasFetchFailed = useReduxSelector(state => state.search.fetchFailed)
  const search = useReduxAction(searchSlice.actions.search)
  const pagination = useReduxSelector(selectPagination)
  const isLoading = useReduxSelector(
    state => state.loaders.loadersById[SearchLoader]
  )

  const stateToRender = useStateToRender(
    hasFetchFailed,
    isLoading,
    searchResults
  )

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ItemT>) => {
    return <SearchResult videoId={item} />
  }, [])

  const onEndReached = useCallback(() => {
    if (!pagination) {
      return
    }

    search(searchQuery)
  }, [searchQuery, pagination])

  return (
    <View style={styles.mainContainer}>
      <SearchInput />
      {stateToRender === 'error' ? (
        <Empty text="Oh snap, something went wrong. Try searching again" />
      ) : null}
      {stateToRender === 'loading' ? <Loading /> : null}
      {stateToRender === 'data' ? (
        <FlatList<ItemT>
          data={searchResults}
          style={styles.resultsMainContainer}
          contentContainerStyle={styles.resultsContainer}
          renderItem={renderItem}
          ListEmptyComponent={<Empty text="Nothing to show" />}
          onEndReached={onEndReached}
          keyExtractor={item => item}
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
