import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { RootStateT } from '../src/types/RootState'
import { mockedFavs } from '../src/mocks/videos'
import { VideoTile } from '../src/components/VideoTile'
import { getStore } from '../src/stores/store'

const store: Partial<RootStateT> = {
  videos: {
    videosById:
      mockedFavs.items?.reduce((acc, x) => ({ ...acc, [x.id]: x }), {}) ?? {}
  },
  favourites: {
    favourites: mockedFavs.items?.map(x => x.id) ?? []
  }
}

describe('VideoTile', () => {
  it('renders bottom row if is in favourites', () => {
    const idx = Math.floor(
      Math.random() * Object.keys(store.videos?.videosById ?? []).length
    )
    const videoId = Object.keys(store.videos?.videosById ?? [])[idx]

    const res = render(
      <Provider store={getStore(store)}>
        <VideoTile id={videoId} includeMetadata />
      </Provider>
    )

    expect(res.queryByTestId('VideoStatisticsRow')).toBeTruthy()
  })

  it('does not render bottom row ', () => {
    const idx = Math.floor(
      Math.random() * Object.keys(store.videos?.videosById ?? []).length
    )
    const videoId = Object.keys(store.videos?.videosById ?? [])[idx]

    const res = render(
      <Provider store={getStore(store)}>
        <VideoTile id={videoId} />
      </Provider>
    )

    expect(res.queryByTestId('VideoStatisticsRow')).toBeFalsy()
  })
})
