import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { FavouritesScreen } from './src/components/FavouritesScreen'
import { SearchScreen } from './src/components/SearchScreen'
import { withRedux } from './src/hoc/withRedux'
import { useReduxAction } from './src/hooks/useReduxAction'
import { useReduxSelector } from './src/hooks/useReduxSelector'
import { userSlice } from './src/reducers/user'
import { colors } from './src/constants/colors'
import { VideoInfoModalProvider } from './src/components/VideoInfoModalProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SearchIcon } from './src/components/icons/Search'
import { HeartIcon } from './src/components/icons/Heart'
import { LogOutIcon } from './src/components/icons/LogOut'

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
    <SafeAreaProvider>
      {!isLoggedIn ? (
        <View style={styles.loginContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>YouTube Backup</Text>
            <Text style={styles.description}>
              This is an app for storing your favourite videos on YouTube.
              Search for videos and add them to your favourites.
            </Text>
          </View>
          <Pressable style={styles.loginButtonContainer} onPress={signIn}>
            <Image
              source={require('./assets/google-logo.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.signInText}>Sign in with Google</Text>
          </Pressable>
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <VideoInfoModalProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  tabBarLabelStyle: {
                    fontSize: 13,
                    lineHeight: 15,
                    fontWeight: '500'
                  },
                  headerRight: () => {
                    return (
                      <Pressable onPress={onLogOutPress}>
                        <LogOutIcon
                          style={{
                            width: 25,
                            height: 25,
                            marginRight: 20
                          }}
                        />
                      </Pressable>
                    )
                  }
                }}
              >
                <Tab.Screen
                  name="Search"
                  component={SearchScreen}
                  options={{
                    headerStyle: {
                      shadowColor: 'transparent', // remove border of header for iOS
                      elevation: 0 // remove border of header for Android
                    },
                    tabBarIcon: ({ focused }) => (
                      <SearchIcon
                        style={{ width: 30, height: 30 }}
                        stroke={focused ? colors.accent : colors.text1}
                      />
                    )
                  }}
                />
                <Tab.Screen
                  name="Favourites"
                  component={FavouritesScreen}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <HeartIcon
                        style={{ width: 30, height: 30 }}
                        stroke={focused ? colors.accent : colors.text1}
                      />
                    )
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </VideoInfoModalProvider>
        </GestureHandlerRootView>
      )}
    </SafeAreaProvider>
  )
}

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

export default withRedux(App)
