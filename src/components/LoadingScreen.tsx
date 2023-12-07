import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { Loading } from './Loading'

export const LoadingScreen = React.memo((props: { testID?: string }) => {
  return (
    <View style={styles.mainContainer} testID={props.testID}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>YouTube Backup</Text>
      </View>
      <Loading />
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '500',
    color: colors.text1
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 100,
    color: colors.text2
  }
})
