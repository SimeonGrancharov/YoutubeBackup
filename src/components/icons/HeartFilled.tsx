import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'

export const HeartFilled = (props: {
  style?: StyleProp<ViewStyle>
  fill?: string
}) => {
  return (
    <Svg viewBox="0 0 24 24" data-name="Livello 1" fill="#000" {...props}>
      <Path
        data-name="favourite"
        d="M23.5 7A6 6 0 0012 4.61 6 6 0 00.84 5C0 7.45.82 9.94 2.51 12L12 23l9.71-11.22A7.74 7.74 0 0023.5 7z"
      />
    </Svg>
  )
}
