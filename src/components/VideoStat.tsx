import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { BubbleIcon } from './icons/Bubble'
import { EyeIcon } from './icons/Eye'
import { ThumbIcon } from './icons/Thumb'

export const VideoStat = React.memo(
  (props: { name: 'views' | 'comments' | 'likes'; value: number | string }) => {
    return (
      <View style={styles.mainContainer}>
        {props.name === 'views' && <EyeIcon style={styles.icon} />}
        {props.name === 'comments' && (
          <BubbleIcon style={{ width: 18, height: 18, top: 2 }} />
        )}
        {props.name === 'likes' && <ThumbIcon style={styles.icon} />}
        <Text style={styles.value}>{props.value}</Text>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
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
