import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View
} from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useReduxAction } from '../hooks/useReduxAction'
import { searchSlice } from '../reducers/search'
import { colors } from '../constants/colors'

export const SearchInput = React.memo(() => {
  const inputRef = useRef<TextInput | null>(null)
  const search = useReduxAction(searchSlice.actions.search)

  const onSubmit = useCallback(
    (ev: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      searchForText(ev.nativeEvent.text.trim())
    },
    []
  )

  const searchForText = useCallback((text: string) => search(text), [])

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search..."
        onSubmitEditing={onSubmit}
        maxLength={70}
        returnKeyType="go"
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.grey
  }
})
