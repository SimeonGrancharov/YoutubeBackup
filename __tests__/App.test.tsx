/**
 * @format
 */

import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react-native'
import { App } from '../App'
import { getStore } from '../src/stores/store'
import { Provider } from 'react-redux'

describe('App', () => {
  it('renders login screen', () => {
    const store = getStore({
      user: {
        isLoggedIn: false
      }
    })

    const result = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(result.getByTestId('LoginScreen')).toBeTruthy()
  })

  it('renders login screen', () => {
    const store = getStore({
      user: {
        isLoggedIn: true
      }
    })

    const result = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(result.queryByTestId('LoginScreen')).toBeFalsy()
  })

  it('renders loading state if needed', () => {
    const store = getStore({
      appState: {
        status: 'initializing'
      },
      user: {
        isLoggedIn: true
      }
    })

    const result = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(result.queryByTestId('LoadingScreen')).toBeTruthy()
  })
})
