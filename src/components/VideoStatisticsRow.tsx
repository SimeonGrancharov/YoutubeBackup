import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BaseVideoT } from '../types/Video'
import { formatNumberCompact } from '../utils/formatters'
import { VideoStat } from './VideoStat'

export const VideoStatisticsRow = React.memo(
  (props: { stats: BaseVideoT['stats']; stretch?: boolean }) => {
    return (
      <View
        testID="VideoStatisticsRow"
        style={[
          styles.mainContainer,
          props.stretch ? { justifyContent: 'space-between' } : undefined
        ]}
      >
        <VideoStat
          name="views"
          value={formatNumberCompact(parseInt(props.stats?.viewCount ?? '0'))}
        />
        <VideoStat
          name="comments"
          value={formatNumberCompact(
            parseInt(props.stats?.commentCount ?? '0')
          )}
        />
        <VideoStat
          name="likes"
          value={formatNumberCompact(parseInt(props.stats?.likeCount ?? '0'))}
        />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    columnGap: 15
  }
})
