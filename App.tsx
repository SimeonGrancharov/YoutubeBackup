import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { FavouritesScreen } from './src/components/FavouritesScreen'
import { SearchScreen } from './src/components/SearchScreen'
import { withRedux } from './src/hoc/withRedux'
import { useReduxSelector } from './src/hooks/useReduxSelector'
import { colors } from './src/constants/colors'
import { VideoInfoModalProvider } from './src/components/VideoInfoModalProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SearchIcon } from './src/components/icons/Search'
import { withSafeAreaProvider } from './src/hoc/withSafeAreaProvider'
import { HeartIcon } from './src/components/icons/Heart'
import { LogOutButton } from './src/components/LogOutButton'
import { LogInScreen } from './src/components/LogInScreen'
import { LoadingScreen } from './src/components/LoadingScreen'

const Tab = createBottomTabNavigator()

export function App(): JSX.Element {
  const appStatus = useReduxSelector(state => state.appState.status)

  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn)

  if (appStatus === 'initializing') {
    return <LoadingScreen testID="LoadingScreen" />
  }

  return (
    <>
      {!isLoggedIn ? (
        <LogInScreen />
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
                  headerRight: LogOutButton
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
    </>
  )
}

export default withSafeAreaProvider(withRedux(App))
