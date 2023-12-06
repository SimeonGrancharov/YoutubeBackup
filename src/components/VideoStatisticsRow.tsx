import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BaseVideoT } from '../types/Video'
import { VideoStat } from './VideoStat'

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    columnGap: 15
  }
})

export const VideoStatisticsRow = React.memo(
  (props: { stats: BaseVideoT['stats']; stretch?: boolean }) => {
    return (
      <View
        style={[
          styles.mainContainer,
          props.stretch ? { justifyContent: 'space-between' } : undefined
        ]}
      >
        <VideoStat
          name="views"
          value={parseInt(props.stats?.viewCount ?? '0')}
        />
        <VideoStat
          name="comments"
          value={parseInt(props.stats?.commentCount ?? '0')}
        />
        <VideoStat
          name="likes"
          value={parseInt(props.stats?.likeCount ?? '0')}
        />
      </View>
    )
  }
)
