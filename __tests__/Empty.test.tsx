import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react-native'
import { Empty } from '../src/components/Empty'

describe('Empty', () => {
  it('Renders passed text', () => {
    const res = render(<Empty text="Empty state" />)

    expect(res.queryByText('Empty state')).toBeTruthy()
  })
})
