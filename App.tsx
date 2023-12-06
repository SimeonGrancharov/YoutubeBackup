import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { FavouritesScreen } from './src/components/FavouritesScreen'
import { SearchScreen } from './src/components/SearchScreen'
import { withRedux } from './src/hoc/withRedux'
import { useReduxAction } from './src/hooks/useReduxAction'
import { useReduxSelector } from './src/hooks/useReduxSelector'
import { userSlice } from './src/reducers/user'

const Tab = createBottomTabNavigator()

function App(): JSX.Element {
  const appStatus = useReduxSelector(state => state.appState.status)
  const logIn = useReduxAction(userSlice.actions.logIn)
  const logOut = useReduxAction(userSlice.actions.logOut)

  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn)

  const signIn = useCallback(() => {
    logIn(false)
  }, [])

  const onLogOutPress = useCallback(() => {
    logOut()
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
              headerStyle: {
                shadowColor: 'transparent', // this covers iOS
                elevation: 0 // this covers Android},
              },
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
