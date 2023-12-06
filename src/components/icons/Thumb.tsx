import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'

export const ThumbIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 10v10m0-10H4v10h4m0-10l5.196-6.062a2 2 0 012.003-.638l.048.012a2 2 0 011.179 3.05L14 10h4.56a2 2 0 011.962 2.392l-1.2 6A2 2 0 0117.36 20H8"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
