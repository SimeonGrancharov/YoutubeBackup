import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { BubbleIcon } from './icons/Bubble'
import { EyeIcon } from './icons/Eye'
import { ThumbIcon } from './icons/Thumb'

export const VideoStat = React.memo(
  (props: { name: 'views' | 'comments' | 'likes'; value: number }) => {
    return (
      <View style={styles.mainContainer}>
        {props.name === 'views' && <EyeIcon style={styles.icon} />}
        {props.name === 'comments' && <BubbleIcon style={styles.icon} />}
        {props.name === 'likes' && <ThumbIcon style={styles.icon} />}
        <Text>{props.value}</Text>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  value: {
    fontSize: 15,
    lineHeight: 19,
    color: colors.text2,
    fontWeight: '500'
  }
})
