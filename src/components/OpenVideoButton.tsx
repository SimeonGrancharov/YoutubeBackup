import React, { useCallback, useMemo } from 'react'
import { Linking, Image, TouchableOpacity } from 'react-native'
import { BaseVideoT } from '../types/Video'
import { getYoutubeVideoUrl } from '../utils/urls'

export const OpenVideoButton = React.memo(
  (props: {
    videoId: BaseVideoT['id']
    marginRight?: number
    size: 'small' | 'big'
  }) => {
    const openUrl = useCallback(() => {
      Linking.openURL(getYoutubeVideoUrl(props.videoId))
    }, [])

    const containerStyle = useMemo(
      () => ({
        marginRight: props.marginRight
      }),
      [props.marginRight]
    )

    return (
      <TouchableOpacity style={containerStyle} onPress={openUrl}>
        <Image
          source={require('../../assets/youtube-logo.png')}
          style={
            props.size === 'small'
              ? {
                  width: 25,
                  height: 25
                }
              : {
                  width: 35,
                  height: 35
                }
          }
        />
      </TouchableOpacity>
    )
  }
)
