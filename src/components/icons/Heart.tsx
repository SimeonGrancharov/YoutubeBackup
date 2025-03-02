import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native'

export const HeartIcon = (props: {
  style?: StyleProp<ViewStyle>
  stroke?: string
}) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      aria-labelledby="favouriteIconTitle"
      stroke={props.stroke ?? '#000'}
      strokeLinecap="square"
      fill="none"
      color="#000"
      {...props}
    >
      <Path d="M12 21l-1.45-1.295C5.4 15.125 2 12.103 2 8.395 2 5.374 4.42 3 7.5 3c1.74 0 3.41.795 4.5 2.05A6.037 6.037 0 0116.5 3C19.58 3 22 5.374 22 8.395c0 3.708-3.4 6.73-8.55 11.32L12 21z" />
    </Svg>
  )
}
