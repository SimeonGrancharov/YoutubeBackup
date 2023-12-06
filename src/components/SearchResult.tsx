import React, { useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { VideoTile } from './VideoTile'

export const SearchResult = React.memo(
  (props: { videoId: BaseVideoT['id'] }) => {
    const addFavourite = useReduxAction(favouritesSlice.actions.addFavourite)

    const isFavouriteVideo = useReduxSelector(state => {
      const favourites = selectFavourites(state)

      return favourites.includes(props.videoId)
    })

    const video = useReduxSelector(
      state => state.videos.videosById[props.videoId]
    )

    const onVideoPress = useCallback(async () => {
      addFavourite(props.videoId)
    }, [props.videoId])

    if (!video) {
      return null
    }

    return (
      <Pressable onPress={onVideoPress}>
        <VideoTile id={video.id} />
      </Pressable>
    )
  }
)
