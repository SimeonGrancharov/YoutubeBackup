import * as z from 'zod'

const ThumbnailSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string()
})

export const YTVideoSchema = z.object({
  id: z.object({
    videoId: z.string()
  }),
  snippet: z.object({
    description: z.string(),
    publishTime: z.string(),
    publishedAt: z.string(),
    title: z.string(),
    thumbnails: z.object({
      default: ThumbnailSchema
    })
  })
})

export const BaseVideoSchema = YTVideoSchema.transform(video => ({
  id: video.id.videoId,
  title: video.snippet.title,
  description: video.snippet.description,
  publishedAt: video.snippet.publishedAt,
  publishTime: video.snippet.publishTime,
  thumb: video.snippet.thumbnails.default
}))

export type BaseVideoT = z.TypeOf<typeof BaseVideoSchema>
