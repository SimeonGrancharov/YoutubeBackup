import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData
} from 'react-native'
import React, { useCallback } from 'react'
import { useReduxAction } from '../hooks/useReduxAction'
import { searchSlice } from '../reducers/search'

export const SearchInput = React.memo(() => {
  const search = useReduxAction(searchSlice.actions.search)

  const onSubmit = useCallback(
    (ev: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      search(ev.nativeEvent.text)
    },
    []
  )

  return (
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
  )
})
