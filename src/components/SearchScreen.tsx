import React, { useCallback } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/selectors'
import { BaseVideoT } from '../types/Video'
import { SearchInput } from './SearchInput'

export const SearchScreen = () => {
  const dispatch = useDispatch()
  const searchResults = useReduxSelector(state => state.search.results)

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <SearchInput />
      {searchResults ? (
        <View>
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

const SearchResult = React.memo((props: { videoId: BaseVideoT['id'] }) => {
  const dispatch = useDispatch()

  const isFavouriteVideo = useReduxSelector(state => {
    const favourites = selectFavourites(state)

    return favourites.includes(props.videoId)
  })

  const video = useReduxSelector(
    state => state.videos.videosById[props.videoId]
  )

  const onVideoPress = useCallback(async () => {
    // TODO move me in a hook
    dispatch(favouritesSlice.actions.addFavourite(props.videoId))
  }, [video])

  if (!video) {
    return null
  }

  return (
    <Pressable onPress={onVideoPress}>
      <Text
        style={{
          color: isFavouriteVideo ? 'green' : 'black'
        }}
      >
        {video.title}
      </Text>
    </Pressable>
  )
})
