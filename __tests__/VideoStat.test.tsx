import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react-native'
import { VideoStat } from '../src/components/VideoStat'

describe('VideoStat', () => {
  it('renders eye icon for views', () => {
    const res = render(<VideoStat name="views" value={0} />)

    expect(res.queryByTestId('EyeIcon')).toBeTruthy()
  })

  it('renders bubble icon for comments', () => {
    const res = render(<VideoStat name="comments" value={0} />)

    expect(res.queryByTestId('BubbleIcon')).toBeTruthy()
  })

  it('renders thumb icon for views', () => {
    const res = render(<VideoStat name="likes" value={0} />)

    expect(res.queryByTestId('ThumbIcon')).toBeTruthy()
  })
})
