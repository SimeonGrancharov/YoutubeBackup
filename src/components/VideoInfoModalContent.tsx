import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { selectVideo } from '../selectors/video'
import { BaseVideoT } from '../types/Video'
import { formatDateLong } from '../utils/formatters'
import { FavouritesButton } from './FavouritesButton'
import { OpenVideoButton } from './OpenVideoButton'
import { VideoStatisticsRow } from './VideoStatisticsRow'

export const VideoInfoModalContent = (props: { id: BaseVideoT['id'] }) => {
  const video = useReduxSelector(state => selectVideo(state, props.id))
  const safeAreaInsets = useSafeAreaInsets()

  if (!video) {
    return null
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.mainContainer,
        {
          paddingBottom: safeAreaInsets.bottom + 20
        }
      ]}
    >
      <View style={styles.header}>
        <FavouritesButton videoId={video.id} />
        <Text style={styles.headerTitle}>Video</Text>
        <OpenVideoButton videoId={video.id} size="big" />
      </View>
      <View style={styles.content}>
        <View style={[styles.item, { paddingTop: 10 }]}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.value}>{video.title}</Text>
        </View>
        <View style={[styles.item, { paddingTop: 10 }]}>
          <Text style={styles.title}>Published:</Text>
          <Text style={styles.value}>{formatDateLong(video.publishedAt)}</Text>
        </View>
        {video.tags ? (
          <View style={styles.item}>
            <Text style={styles.title}>Tags</Text>
            <Text style={[styles.value, { color: colors.accent }]}>
              {video.tags?.join(', #')}
            </Text>
          </View>
        ) : null}
        {video.stats ? (
          <View style={styles.item}>
            <Text style={styles.title}>Stats</Text>
            <VideoStatisticsRow stats={video.stats} stretch />
          </View>
        ) : null}

        <View style={[styles.item, { borderBottomWidth: 0 }]}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.value}>{video.description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {},
  content: {
    paddingLeft: 15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },
  headerTitle: {
    fontSize: 23,
    lineHeight: 27,
    fontWeight: '500',
    color: colors.text1
  },
  item: {
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    borderBottomColor: colors.text2,
    paddingTop: 20
  },
  title: {
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '500',
    color: colors.text1,
    marginBottom: 10
  },
  value: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '400',
    color: colors.text1
  }
})
