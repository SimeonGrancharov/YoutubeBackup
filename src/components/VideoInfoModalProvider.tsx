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
  withSpring,
  withTiming
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
      // Simply do not allow dragging upwards above the content
      animationValue.value = Math.max(animationValue.value + ev.changeY, 0)
    })
    .onFinalize(() => {
      // If dragged to half the height -> close the modal
      if (animationValue.value > (contentHeight ?? 0) / 2) {
        animationValue.value = withTiming(
          contentHeight ?? 0,
          { duration: 200 },
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
    left: 0,
    right: 0,
    zIndex: 50,
    maxHeight: windowHeight * 0.65,
    alignItems: 'center'
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  pinch: {
    width: 60,
    height: 7,
    borderRadius: 15,
    backgroundColor: colors.lightGrey,
    marginBottom: 10
  }
})
