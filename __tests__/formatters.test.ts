import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import '@testing-library/jest-dom'
import {
  formatNumberCompact,
  formatNumberInNotion
} from '../src/utils/formatters'

describe('formatters', () => {
  it('formatNumberCompact formats Grands', () => {
    expect(formatNumberCompact(1234)).toBe('1.2K')
  })

  it('formatNumberCompact formats Mils', () => {
    expect(formatNumberCompact(1234567)).toBe('1.2M')
  })

  it('formatNumberCompact formats Bils', () => {
    expect(formatNumberCompact(1234567891)).toBe('1.2B')
  })

  it('formatNumberCompact does not format number less than grand', () => {
    expect(formatNumberCompact(123)).toBe('123')
  })

  it('formatNumberInNotion formats whole number without the decimal part', () => {
    expect(formatNumberInNotion(1000, 1_000, 'K')).toBe('1K')
  })
})
