import * as z from 'zod'
import { BaseVideoSchema } from './Video'

export const VideosResponseSchema = z.object({
  nextPageToken: z.string().nullish(),
  items: z.array(BaseVideoSchema).nullish()
})

export type VideosResponseT = z.TypeOf<typeof VideosResponseSchema>
