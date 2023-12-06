import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { colors } from '../constants/colors'
import { useReduxAction } from '../hooks/useReduxAction'
import { useReduxSelector } from '../hooks/useReduxSelector'
import { favouritesSlice } from '../reducers/favourites'
import { selectFavourites } from '../selectors/favourites'
import { BaseVideoT } from '../types/Video'
import { HeartIcon } from './icons/Heart'
import { HeartFilled } from './icons/HeartFilled'

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
        {isInFavourites ? (
          <HeartFilled style={styles.icon} fill={colors.negative} />
        ) : (
          <HeartIcon style={styles.icon} />
        )}
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
})
