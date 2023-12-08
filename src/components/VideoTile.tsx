import React, { useCallback } from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useOpenVideoInfoModal } from '../hooks/useOpenVideoInfoModal'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { selectVideo } from '../selectors/video'
import { BaseVideoT } from '../types/Video'
import { FavouritesButton } from './FavouritesButton'
import { OpenVideoButton } from './OpenVideoButton'
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
      <TouchableOpacity onPress={openInfoModal} activeOpacity={0.8}>
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
                numberOfLines={2}
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
            <View style={styles.bottomRowRightContent}>
              <OpenVideoButton
                videoId={video.id}
                size="small"
                marginRight={15}
                marginTop={-2}
              />
              <FavouritesButton videoId={video.id} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

  bottomRowRightContent: {
    flexDirection: 'row',
    rowGap: 10
  },
  image: {
    marginRight: 10,
    borderRadius: 4
  },
  rightContent: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.text1,
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.text2
  }
})
