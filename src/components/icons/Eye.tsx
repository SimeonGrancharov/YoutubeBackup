import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'
import { colors } from '../../constants/colors'

export const EyeIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" style={props.style}>
      <Path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        stroke={colors.text1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7z"
        stroke={colors.text1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
