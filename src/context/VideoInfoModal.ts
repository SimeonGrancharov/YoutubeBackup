import React from 'react'
import { BaseVideoT } from '../types/Video'

export type ContextT = {
  openVideoInfoModal: (id: BaseVideoT['id']) => void
}

export const VideoInfoModalContext = React.createContext<ContextT>({
  openVideoInfoModal: () => {}
})
