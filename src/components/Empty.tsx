import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

export const Empty = React.memo((props: { text: string }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 70,
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    lineHeight: 30,
    color: colors.text1,
    fontWeight: '500'
  }
})
