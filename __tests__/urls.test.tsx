import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import '@testing-library/jest-dom'
import { getYoutubeVideoUrl } from '../src/utils/urls'

describe('urls', () => {
  it('getYoutubeVideoUrl returns right url', () => {
    const id = 'Moni'

    expect(getYoutubeVideoUrl(id)).toBe(`https://youtube.com/watch?v=${id}`)
  })
})
