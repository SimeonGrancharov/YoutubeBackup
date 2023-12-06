import React, { useCallback } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { searchSlice } from '../reducers/search'
import { selectFavourites } from '../selectors/selectors'
import { BaseVideoT } from '../types/Video'

export const SearchScreen = () => {
  const dispatch = useDispatch()
  const searchResults = useReduxSelector(state => state.search.results)

  const onSubmit = useCallback(
    (ev: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      dispatch(searchSlice.actions.search(ev.nativeEvent.text))
    },
    []
  )

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <TextInput
        style={{
          width: 200,
          backgroundColor: 'salmon',
          marginBottom: 50
        }}
        placeholder="Monka ti li si?"
        onSubmitEditing={onSubmit}
        returnKeyType="go"
      />
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
