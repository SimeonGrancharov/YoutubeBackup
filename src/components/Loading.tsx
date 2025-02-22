import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

export const Loading = React.memo(() => {
  return (
    <ActivityIndicator
      size="large"
      color={colors.text1}
      style={styles.mainContainer}
    />
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})
