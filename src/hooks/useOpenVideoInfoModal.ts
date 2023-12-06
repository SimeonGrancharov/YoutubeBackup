import { useContext } from 'react'
import { VideoInfoModalContext } from '../context/VideoInfoModal'

export function useOpenVideoInfoModal() {
  return useContext(VideoInfoModalContext).openVideoInfoModal
}
