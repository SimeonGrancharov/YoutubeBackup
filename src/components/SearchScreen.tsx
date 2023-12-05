import { useCallback } from 'react'
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { searchSlice } from '../reducers/search'

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
    <View style={{}}>
      <TextInput
        style={{
          width: 200,
          backgroundColor: 'salmon'
        }}
        placeholder="Monka ti li si?"
        onSubmitEditing={onSubmit}
        returnKeyType="go"
      />

      {searchResults ? (
        <View>
          {searchResults.length ? (
            searchResults.map(resultId => <Text>{resultId}</Text>)
          ) : (
            <Text>Nothing to show, eh</Text>
          )}
        </View>
      ) : null}
    </View>
  )
}
