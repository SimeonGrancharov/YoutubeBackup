import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { selectVideo } from '../selectors/video'
import { BaseVideoT } from '../types/Video'

export const VideoTile = React.memo((props: { id: BaseVideoT['id'] }) => {
  const video = useReduxSelector(state => selectVideo(state, props.id))

  if (!video) {
    return null
  }

  return (
    <View style={styles.mainContainer}>
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
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {video.description}
        </Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
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
