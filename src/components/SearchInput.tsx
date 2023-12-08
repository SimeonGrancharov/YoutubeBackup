import { StyleSheet, TextInput, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useReduxAction } from '../hooks/useReduxAction'
import { searchSlice } from '../reducers/search'
import { colors } from '../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ClearIcon } from './icons/Clear'

export const SearchInput = React.memo(() => {
  const inputRef = useRef<TextInput | null>(null)
  const search = useReduxAction(searchSlice.actions.search)

  const [value, setValue] = useState<string>('')

  const onSubmit = useCallback(() => {
    search(value.trim())
  }, [value])

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search..."
        onSubmitEditing={onSubmit}
        maxLength={70}
        returnKeyType="done"
        value={value}
        onChangeText={setValue}
      />
      {value ? (
        <TouchableOpacity
          testID="ClearSearchInputButton"
          style={styles.clearIconContainer}
          onPress={() => {
            setValue('')
          }}
        >
          <ClearIcon style={styles.clearIcon} fill={colors.text2} />
        </TouchableOpacity>
      ) : null}
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
    height: 40,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.grey
  },
  clearIconContainer: {
    marginLeft: 10
  },
  clearIcon: {
    width: 20,
    height: 20
  }
})
