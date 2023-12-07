import React, { useCallback } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { useReduxAction } from '../hooks/useReduxAction'
import { userSlice } from '../reducers/user'

export const LogInScreen = React.memo(() => {
  const logInAction = useReduxAction(userSlice.actions.logIn)

  const logIn = useCallback(() => {
    logInAction(false)
  }, [])

  return (
    <View style={styles.loginContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>YouTube Backup</Text>
        <Text style={styles.description}>
          This is an app for storing your favourite videos on YouTube. Search
          for videos and add them to your favourites.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.loginButtonContainer}
        onPress={logIn}
      >
        <Image
          source={require('../../assets/google-logo.png')}
          style={styles.googleLogo}
        />
        <Text style={styles.signInText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  loginContainer: {
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
  },
  loginButtonContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.text2,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleLogo: {
    width: 30,
    height: 30
  },
  signInText: {
    color: colors.text1,
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24
  }
})
