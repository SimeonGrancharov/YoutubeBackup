import React, { useCallback } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { SearchInput } from './SearchInput'
import { BaseVideoT } from '../types/Video'
import { SearchResult } from './SearchResult'

type ItemT = BaseVideoT['id']

export const SearchScreen = () => {
  const searchResults = useReduxSelector(state => state.search.results)

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ItemT>) => {
    return <SearchResult videoId={item} />
  }, [])

  return (
    <View style={styles.mainContainer}>
      <SearchInput />
      {searchResults !== undefined ? (
        <FlatList<ItemT>
          data={searchResults}
          style={styles.resultsMainContainer}
          contentContainerStyle={styles.resultsContainer}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nothing to show, eh</Text>}
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
