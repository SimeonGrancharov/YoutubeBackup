import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { withRedux } from './src/hoc/withRedux'
import { useReduxSelector } from './src/hooks/useReduxSelector'
import { userSlice } from './src/reducers/user'
import { googleSignIn } from './src/services/google'

function App(): JSX.Element {
  const appStatus = useReduxSelector(state => state.appState.status)
  const dispatch = useDispatch()
  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn)

  const signIn = useCallback(async () => {
    try {
      await googleSignIn()

      const tokens = await GoogleSignin.getTokens()

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=e82&type=video&part=snippet`,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (appStatus === 'not-ready') {
    return <></>
  }

  if (appStatus === 'initializing') {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: 'red'
        }}
      />
    )
  }

  return (
    <View
      style={{
        marginTop: 150
      }}
    >
      {!isLoggedIn ? (
        <GoogleSigninButton onPress={signIn} />
      ) : (
        <View
          style={{
            width: '100%',
            height: 400,
            backgroundColor: 'red'
          }}
        >
          <Pressable
            onPress={async () => {
              await GoogleSignin.signOut()
              dispatch(userSlice.actions.setIsLoggedIn(false))
            }}
          >
            <Text>Sign Out</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default withRedux(App)
