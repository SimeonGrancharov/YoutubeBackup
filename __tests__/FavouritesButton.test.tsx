import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { RootStateT } from '../src/types/RootState'
import { mockedFavs } from '../src/mocks/videos'
import { getStore } from '../src/stores/store'
import { FavouritesButton } from '../src/components/FavouritesButton'

const store: Partial<RootStateT> = {
  favourites: {
    favourites: mockedFavs.items?.map(x => x.id) ?? []
  }
}

describe('FavouritesButton', () => {
  it('renders active state if video is in favourites', () => {
    const idx = Math.floor(
      Math.random() * (store.favourites?.favourites ?? []).length
    )
    const videoId = (store.favourites?.favourites ?? [])[idx]

    const res = render(
      <Provider store={getStore(store)}>
        <FavouritesButton videoId={videoId} />
      </Provider>
    )

    expect(res.queryByTestId('FavouritesButton-Active')).toBeTruthy()
  })

  it('renders inactive state if video is not in favourites', () => {
    const idx = Math.floor(
      Math.random() * (store.favourites?.favourites ?? []).length
    )
    const videoId = (store.favourites?.favourites ?? [])[idx]

    const res = render(
      <Provider
        store={getStore({
          ...store,
          favourites: {
            favourites:
              store.favourites?.favourites.filter(x => x !== videoId) ?? []
          }
        })}
      >
        <FavouritesButton videoId={videoId} />
      </Provider>
    )

    expect(res.queryByTestId('FavouritesButton-Inactive')).toBeTruthy()
  })
})
