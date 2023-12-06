import { RootStateT } from '../types/RootState'
import { BaseVideoT } from '../types/Video'

export function selectVideo(
  state: RootStateT,
  id: BaseVideoT['id']
): BaseVideoT | undefined {
  return state.videos.videosById[id]
}
