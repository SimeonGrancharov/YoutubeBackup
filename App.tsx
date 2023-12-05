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
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [`https://www.googleapis.com/auth/youtube`],
      iosClientId:
        '719318481645-ssoagvt5c2v1rm3hmsv3g1sqgova7vs9.apps.googleusercontent.com',
      webClientId:
        '719318481645-903hovl9tieh04rn719utgbbslnbsb86.apps.googleusercontent.com'
    })

    setIsReady(true)
  }, [])

  const dispatch = useDispatch()
  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn)

  useEffect(() => {
    if (!isReady) {
      return
    }

    async function getIsSignedIn() {
      const isSignedIn = await GoogleSignin.isSignedIn()

      dispatch(userSlice.actions.setIsLoggedIn(isSignedIn))
    }

    getIsSignedIn()
  }, [isReady])

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

      const data = await res.json()

      dispatch(userSlice.actions.setIsLoggedIn(true))

      console.log(JSON.stringify(data))
    } catch (err) {
      console.log(err)
    }
  }, [])

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
