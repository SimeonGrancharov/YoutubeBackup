import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
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

    const requestAddToFavourites = useReduxAction(
      favouritesSlice.actions.requestAddFavourite
    )
    const removeFromFavourites = useReduxAction(
      favouritesSlice.actions.removeFavourite
    )

    const onFavouritesButtonPress = useCallback(() => {
      if (isInFavourites) {
        removeFromFavourites(props.videoId)
      } else {
        requestAddToFavourites(props.videoId)
      }
    }, [isInFavourites])

    return (
      <TouchableOpacity
        testID={`FavouritesButton-${isInFavourites ? 'Active' : 'Inactive'}`}
        activeOpacity={0.8}
        onPress={onFavouritesButtonPress}
      >
        {isInFavourites ? (
          <HeartFilled style={styles.icon} fill={colors.negative} />
        ) : (
          <HeartIcon
            style={{
              width: 21,
              height: 21
            }}
          />
        )}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
})
