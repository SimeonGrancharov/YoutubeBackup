import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'
import { colors } from '../../constants/colors'

export const BubbleIcon = React.memo(
  (props: { style?: StyleProp<ViewStyle> }) => {
    return (
      <Svg viewBox="0 0 32 32" testID="BubbleIcon" {...props}>
        <Path
          d="M116 281c-1.168 0-2.296-.136-3.38-.367l-4.708 2.83.063-4.639c-3.609-2.17-5.975-5.758-5.975-9.824 0-6.627 6.268-12 14-12s14 5.373 14 12c0 6.628-6.268 12-14 12zm0-26c-8.836 0-16 6.269-16 14 0 4.419 2.345 8.354 6 10.919V287l7.009-4.253c.97.16 1.968.253 2.991.253 8.836 0 16-6.268 16-14 0-7.731-7.164-14-16-14z"
          transform="translate(-100 -255)"
          fill={colors.text1}
          stroke="none"
          strokeWidth={1}
          fillRule="evenodd"
        />
      </Svg>
    )
  }
)
