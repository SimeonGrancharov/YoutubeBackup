import he from 'he'
import * as z from 'zod'

const ThumbnailSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string()
})

export const YTSearchVideoSchema = z.object({
  id: z.union([
    z.object({
      videoId: z.string()
    }),
    z.string()
  ]),
  snippet: z.object({
    description: z.string(),
    publishTime: z.string().nullish(),
    publishedAt: z.string(),
    title: z.string(),
    thumbnails: z.object({
      default: ThumbnailSchema
    }),
    tags: z.array(z.string()).nullish()
  }),
  statistics: z
    .object({
      viewCount: z.string().nullish(),
      likeCount: z.string().nullish(),
      commentCount: z.string().nullish()
    })
    .nullish()
})

export const BaseVideoSchema = YTSearchVideoSchema.transform(video => ({
  id: typeof video.id === 'object' ? video.id.videoId : video.id,
  title: he.decode(video.snippet.title),
  description: video.snippet.description,
  publishedAt: video.snippet.publishedAt,
  publishTime: video.snippet.publishTime,
  thumb: video.snippet.thumbnails.default,
  tags: video.snippet.tags,
  stats: video.statistics
}))

export type BaseVideoT = z.TypeOf<typeof BaseVideoSchema>
