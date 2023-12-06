import { BaseVideoT } from '../types/Video'

export function getYoutubeVideoUrl(id: BaseVideoT['id']) {
  return `https://youtube.com/watch?v=${id}`
}
