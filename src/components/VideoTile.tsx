import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useOpenVideoInfoModal } from '../hooks/useOpenVideoInfoModal'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { selectVideo } from '../selectors/video'
import { BaseVideoT } from '../types/Video'
import { FavouritesButton } from './FavouritesButton'
import { VideoStatisticsRow } from './VideoStatisticsRow'

export const VideoTile = React.memo(
  (props: { id: BaseVideoT['id']; includeMetadata?: boolean }) => {
    const video = useReduxSelector(state => selectVideo(state, props.id))
    const openVideoInfoModal = useOpenVideoInfoModal()

    const openInfoModal = useCallback(() => {
      if (!video) {
        return
      }

      openVideoInfoModal(video.id)
    }, [openVideoInfoModal, video?.id])

    if (!video) {
      return null
    }

    return (
      <Pressable onPress={openInfoModal}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Image
              source={{
                uri: video.thumb.url
              }}
              style={[
                styles.image,
                {
                  height: video.thumb.height,
                  width: video.thumb.width
                }
              ]}
            />

            <View style={styles.rightContent}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {video.title}
              </Text>
              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {video.description}
              </Text>
            </View>
          </View>
          <View style={styles.bottomRow}>
            {props.includeMetadata && video.stats !== undefined ? (
              <VideoStatisticsRow stats={video.stats} />
            ) : null}
            <FavouritesButton videoId={video.id} />
          </View>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  image: {
    marginRight: 10
  },
  rightContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.text1,
    marginBottom: 20
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.text2
  }
})
