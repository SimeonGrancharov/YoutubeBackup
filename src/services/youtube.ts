import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as z from 'zod'
import { BaseVideoSchema } from '../types/Video'

const SearchByQueryResponse = z.object({
  nextPageToken: z.string().nullish(),
  items: z.array(BaseVideoSchema)
})

export async function searchByQuery(
  query: string
): Promise<z.TypeOf<typeof SearchByQueryResponse>> {
  console.log(await GoogleSignin.isSignedIn())
  const tokens = await GoogleSignin.getTokens()

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
      query
    )}&type=video&part=snippet`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    }
  )

  const data = await response.json()

  return SearchByQueryResponse.parse(data)
}
