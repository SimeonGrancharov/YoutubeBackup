import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'
import { colors } from '../../constants/colors'

export const LogOutIcon = (props: {
  style?: StyleProp<ViewStyle>
  stroke?: string
}) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M18 8l4 4m0 0l-4 4m4-4H9m6-7.796A8.383 8.383 0 0010.667 3C5.88 3 2 7.03 2 12s3.88 9 8.667 9A8.384 8.384 0 0015 19.796"
        stroke={props.stroke ?? colors.text1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
