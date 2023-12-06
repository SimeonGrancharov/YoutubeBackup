import { View, Text, ScrollView } from 'react-native'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { selectVideo } from '../selectors/video'
import { BaseVideoT } from '../types/Video'
import { VideoStatisticsRow } from './VideoStatisticsRow'

export const VideoInfoModalContent = (props: { id: BaseVideoT['id'] }) => {
  const video = useReduxSelector(state => selectVideo(state, props.id))

  if (!video) {
    return null
  }

  return (
    <ScrollView>
      <View>
        <Text>Title</Text>
        <Text>{video.title}</Text>
      </View>
      <View>
        <Text>Description</Text>
        <Text>{video.description}</Text>
      </View>
      {video.tags ? (
        <View>
          <Text>Tags</Text>
          <Text>{video.tags?.join(', ')}</Text>
        </View>
      ) : null}
      {video.stats ? <VideoStatisticsRow stats={video.stats} /> : null}
    </ScrollView>
  )
}
