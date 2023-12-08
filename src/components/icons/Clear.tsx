import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, ViewStyle } from 'react-native/types'
import { colors } from '../../constants/colors'

export const ClearIcon = React.memo(
  (props: { style?: StyleProp<ViewStyle>; fill?: string }) => {
    return (
      <Svg viewBox="0 0 1024 1024" {...props}>
        <Path
          d="M554.586 512l170.557-170.556c11.444-11.415 11.595-30.66-.181-42.406a29.907 29.907 0 00-42.406-.18L512 469.413 341.444 298.857a30.208 30.208 0 00-42.406.181 29.907 29.907 0 00-.18 42.406L469.413 512 298.857 682.556c-11.444 11.415-11.595 30.66.181 42.406a29.907 29.907 0 0042.406.18L512 554.587l170.556 170.557c11.415 11.444 30.66 11.595 42.406-.181a29.907 29.907 0 00.18-42.406L554.587 512zM512 993.882C245.85 993.882 30.118 778.15 30.118 512S245.85 30.118 512 30.118 993.882 245.85 993.882 512 778.15 993.882 512 993.882z"
          fill={props.fill ?? colors.text1}
        />
      </Svg>
    )
  }
)
