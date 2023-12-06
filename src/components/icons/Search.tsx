import { StyleProp, ViewStyle } from 'react-native/types'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../constants/colors'

export const SearchIcon = (props: {
  style?: StyleProp<ViewStyle>
  stroke?: string
}) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16.672 16.641L21 21m-2-10a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke={props.stroke ?? colors.text1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
