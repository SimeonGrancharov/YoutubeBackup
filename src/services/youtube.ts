import * as z from 'zod'
import { getHeaders } from './headers'
import { BaseVideoT } from '../types/Video'
import { VideosResponseSchema, VideosResponseT } from '../types/SearchResponse'

export async function searchByQuery(
  query: string,
  nextPageToken: string | undefined
): Promise<VideosResponseT> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
      query
    )}&type=video&part=snippet&maxResults=10${
      nextPageToken ? `&pageToken=${nextPageToken}` : ''
    }`,
    {
      headers: getHeaders()
    }
  )

  const data = await response.json()

  // const data = mockedSearch
  return VideosResponseSchema.parse(data)
}

export async function fetchVideos(videos: BaseVideoT['id'][]) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${encodeURIComponent(
      videos.join(',')
    )}&part=snippet,statistics`,
    {
      headers: getHeaders()
    }
  )

  const data = await response.json()

  // const data = mockedFavs

  return VideosResponseSchema.parse(data)
}
