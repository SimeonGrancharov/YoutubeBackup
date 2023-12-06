import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { colors } from '../constants/colors'
import { VideoInfoModalContext } from '../context/VideoInfoModal'
import { BaseVideoT } from '../types/Video'
import { VideoInfoModalContent } from './VideoInfoModalContent'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const windowHeight = Dimensions.get('window').height

export const VideoInfoModalProvider = (props: {
  children: React.ReactNode
}) => {
  const [openedVideoId, setOpenedVideoId] = useState<
    BaseVideoT['id'] | undefined
  >()
  const [contentHeight, setContentHeight] = useState<number | undefined>()

  const animationValue = useSharedValue(0)

  useEffect(() => {
    // Just reset the value whenever id changes
    animationValue.value = 0
  }, [openedVideoId])

  const openVideoInfoModal = useCallback(
    (videoId: BaseVideoT['id']) => {
      if (openedVideoId) {
        console.log(
          'Trying to open video, when another is opened. Terminating...'
        )
      }

      setOpenedVideoId(videoId)
    },
    [openedVideoId]
  )

  const pan = Gesture.Pan()
    .onChange(ev => {
      // If the gesture is downwards -> update the value to move the sheet accordingly
      animationValue.value += ev.changeY > 0 ? ev.changeY : 0
    })
    .onFinalize(() => {
      // If dragged to half the height -> close the modal
      if (animationValue.value > (contentHeight ?? 0) / 2) {
        animationValue.value = withSpring(
          contentHeight ?? 0,
          { duration: 500 },
          () => {
            runOnJS(setOpenedVideoId)(undefined)
          }
        )
        return
      }

      // Else just return it to initial state
      animationValue.value = withSpring(0, { duration: 500 })
    })

  const contextValue = useMemo(
    () => ({
      openVideoInfoModal
    }),
    [openVideoInfoModal]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animationValue.value }]
  }))

  return (
    <VideoInfoModalContext.Provider value={contextValue}>
      {props.children}
      {openedVideoId ? (
        <>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => setOpenedVideoId(undefined)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 49
            }}
          />
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={[styles.bottomSheet, animatedStyle]}
            onLayout={ev => {
              if (contentHeight) {
                return
              }

              setContentHeight(ev.nativeEvent.layout.height)
            }}
          >
            <GestureDetector gesture={pan}>
              <View style={styles.pinch} />
            </GestureDetector>
            <View style={styles.contentContainer}>
              <VideoInfoModalContent id={openedVideoId} />
            </View>
          </Animated.View>
        </>
      ) : null}
    </VideoInfoModalContext.Provider>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 50,
    maxHeight: Dimensions.get('window').height / 2,
    alignItems: 'center'
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20
  },
  pinch: {
    width: 60,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.text1,
    marginBottom: 10
  }
})
