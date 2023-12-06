import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as z from 'zod'
import { BaseVideoSchema, BaseVideoT } from '../types/Video'

const Response = z.object({
  nextPageToken: z.string().nullish(),
  items: z.array(BaseVideoSchema)
})

export async function searchByQuery(
  query: string
): Promise<z.TypeOf<typeof Response>> {
  const tokens = await GoogleSignin.getTokens()

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
      query
    )}&type=video&part=snippet&maxResults=20`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    }
  )

  const data = await response.json()

  return Response.parse(data)
}

export async function fetchVideos(videos: BaseVideoT['id'][]) {
  const tokens = await GoogleSignin.getTokens()

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${encodeURIComponent(
      videos.join(',')
    )}&part=snippet,statistics`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    }
  )

  const data = await response.json()

  return Response.parse(data)
}
