import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { SearchInput } from './SearchInput'
import { SearchResult } from './SearchResult'

export const SearchScreen = () => {
  const searchResults = useReduxSelector(state => state.search.results)

  return (
    <View style={styles.mainContainer}>
      <SearchInput />
      {searchResults ? (
        <View style={styles.resultsContainer}>
          {searchResults.length ? (
            searchResults.map(resultId => (
              <SearchResult key={resultId} videoId={resultId} />
            ))
          ) : (
            <Text>Nothing to show, eh</Text>
          )}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 5
  },
  resultsContainer: {
    flex: 1
  }
})
