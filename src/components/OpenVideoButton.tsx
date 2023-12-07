import React, { useCallback, useMemo } from 'react'
import { Linking, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { BaseVideoT } from '../types/Video'
import { getYoutubeVideoUrl } from '../utils/urls'

export const OpenVideoButton = React.memo(
  (props: {
    videoId: BaseVideoT['id']
    marginRight?: number
    marginTop?: number
    size: 'small' | 'big'
  }) => {
    const openUrl = useCallback(() => {
      Linking.openURL(getYoutubeVideoUrl(props.videoId))
    }, [])

    const containerStyle = useMemo(
      () => ({
        marginRight: props.marginRight,
        marginTop: props.marginTop
      }),
      [props.marginRight, props.marginTop]
    )

    const imageStyle = useMemo(
      () =>
        props.size === 'small'
          ? {
              width: 25,
              height: 25
            }
          : {
              width: 35,
              height: 35
            },
      [props.size]
    )

    return (
      <TouchableOpacity style={containerStyle} onPress={openUrl}>
        <Image
          source={require('../../assets/youtube-logo.png')}
          style={imageStyle}
        />
      </TouchableOpacity>
    )
  }
)
