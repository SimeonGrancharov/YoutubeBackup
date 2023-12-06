import React, { useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'

export const FavouritesButton = React.memo(
  (props: { videoId: BaseVideoT['id'] }) => {
    const isInFavourites = useReduxSelector(state => {
      const favs = selectFavourites(state)

      return favs?.includes(props.videoId)
    })

    const addToFavourites = useReduxAction(favouritesSlice.actions.addFavourite)
    const removeFromFavourites = useReduxAction(
      favouritesSlice.actions.removeFavourite
    )

    const onFavouritesButtonPress = useCallback(() => {
      if (isInFavourites) {
        removeFromFavourites(props.videoId)
      } else {
        addToFavourites(props.videoId)
      }
    }, [isInFavourites])
    return (
      <Pressable onPress={onFavouritesButtonPress}>
        <Text>{isInFavourites ? 'Added ' : 'Add to'}</Text>
      </Pressable>
    )
  }
)
