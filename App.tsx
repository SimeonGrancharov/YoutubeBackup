import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { FavouritesScreen } from './src/components/FavouritesScreen'
import { SearchScreen } from './src/components/SearchScreen'
import { withRedux } from './src/hoc/withRedux'
import { useReduxSelector } from './src/hooks/useReduxSelector'
import { userSlice } from './src/reducers/user'

const Tab = createBottomTabNavigator()

function App(): JSX.Element {
  const appStatus = useReduxSelector(state => state.appState.status)
  const dispatch = useDispatch()
  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn)

  const signIn = useCallback(() => {
    // TODO Move me in a hook
    dispatch(userSlice.actions.logIn(false))
  }, [])

  const onLogOutPress = useCallback(() => {
    // TODO Move me in a hook
    dispatch(userSlice.actions.logOut())
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
    <>
      {!isLoggedIn ? (
        <GoogleSigninButton style={{ marginTop: 150 }} onPress={signIn} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerRight: () => {
                return (
                  <Pressable onPress={onLogOutPress}>
                    <Text>Sign out</Text>
                  </Pressable>
                )
              }
            }}
          >
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

export default withRedux(App)
