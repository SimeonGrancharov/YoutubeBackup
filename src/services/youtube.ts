import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as z from 'zod'
import { getHeaders } from './headers'
import { BaseVideoSchema, BaseVideoT } from '../types/Video'

const Response = z.object({
  nextPageToken: z.string().nullish(),
  items: z.array(BaseVideoSchema).nullish()
})

const mockedSearch = {
  kind: 'youtube#searchListResponse',
  etag: 'Y1x9dCpLI6VGfoHWLrWqlruihSw',
  nextPageToken: 'CAoQAA',
  regionCode: 'BG',
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 10
  },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: 'zV3pKBsRTPXYxIdrQkImzXe3p2k',
      id: { kind: 'youtube#video', videoId: '0xXqSKN1oxc' },
      snippet: {
        publishedAt: '2023-11-18T08:00:07Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - нощни птици (Official Video)',
        description:
          'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/ Download/stream: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/0xXqSKN1oxc/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/0xXqSKN1oxc/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/0xXqSKN1oxc/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'BORO PURVI',
        liveBroadcastContent: 'none',
        publishTime: '2023-11-18T08:00:07Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'elYM4lJliNNzLp0INAhcUf8PMIw',
      id: {
        kind: 'youtube#video',
        videoId: 'JP42Fw8fqxc'
      },
      snippet: {
        publishedAt: '2023-12-01T16:06:17Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - докато смъртта / ни раздели (Lyric Video)',
        description:
          'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/ Download/stream: https://bfan.link/pzsip ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'BORO PURVI',
        liveBroadcastContent: 'none',
        publishTime: '2023-12-01T16:06:17Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'osbH2EJlLQtQ_XU5QMup0H4SF_E',
      id: {
        kind: 'youtube#video',
        videoId: 'vXc1QNC86X4'
      },
      snippet: {
        publishedAt: '2023-08-24T14:00:42Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - асансьора (feat. ALEX &amp; VLADI)',
        description:
          'първи сингъл от новия албум “Песни за сватби и погребения" Download/stream: https://bfan.link/asansiora Booking & Media ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/vXc1QNC86X4/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/vXc1QNC86X4/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/vXc1QNC86X4/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'BORO PURVI',
        liveBroadcastContent: 'none',
        publishTime: '2023-08-24T14:00:42Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'MQ9ApvuZRuMnJ7W5_FzhjC9w6eQ',
      id: {
        kind: 'youtube#video',
        videoId: '7Rk2BzeWQQE'
      },
      snippet: {
        publishedAt: '2022-10-10T15:00:08Z',
        channelId: 'UClgtSqIYSU2f7lu1dG_rMxg',
        title:
          'BORO PURVI ft. Yoana Sashova - KAMUK I NOJICA 🗿✂️ [Official Video]',
        description:
          'Download/stream: https://bfan.link/kamk-i-nozhica Booking & Media info: martin@twelves.bg Follow Boro Purvi Instagram: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/7Rk2BzeWQQE/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/7Rk2BzeWQQE/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/7Rk2BzeWQQE/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'FacingTheSunOfficial',
        liveBroadcastContent: 'none',
        publishTime: '2022-10-10T15:00:08Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'MXgBpAz2Pea-qxxR8xFjOlOgM8A',
      id: {
        kind: 'youtube#video',
        videoId: 'ovPLOxt687c'
      },
      snippet: {
        publishedAt: '2023-09-25T12:00:48Z',
        channelId: 'UC2-jGLG9Myz5rjipABCw08g',
        title: 'Boro, Artie 5ive, Andry The Hitmaker - Cadillac',
        description:
          'Ascolta “Cadillac (feat. Artie 5ive)”: https://boro.bio.to/cadillac Segui Boro su Instagram: https://www.instagram.com/boroboro35/ ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/ovPLOxt687c/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/ovPLOxt687c/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/ovPLOxt687c/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'BoroBoroVEVO',
        liveBroadcastContent: 'none',
        publishTime: '2023-09-25T12:00:48Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'lLt-9aFJ9I2Blqy9RtALNU8u2Lo',
      id: {
        kind: 'youtube#video',
        videoId: 'kFgqsgX6VMM'
      },
      snippet: {
        publishedAt: '2023-12-01T16:06:29Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - долари (feat. KRISKO) (Lyric Video)',
        description:
          'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/ Download/stream: https://bfan.link/pzsip ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'BORO PURVI',
        liveBroadcastContent: 'none',
        publishTime: '2023-12-01T16:06:29Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: '0ppy67W0Ph8nJVYEEVB8UYV3S7o',
      id: {
        kind: 'youtube#video',
        videoId: 'aiBMAPoyVFk'
      },
      snippet: {
        publishedAt: '2022-07-07T16:00:01Z',
        channelId: 'UClgtSqIYSU2f7lu1dG_rMxg',
        title: 'БОРО ПЪРВИ - БИЗНЕС 💸 [Official Video]',
        description:
          'Download/stream: https://bfan.link/biznes-1 Booking & Media info: martin@twelves.bg Follow Boro Purvi Instagram: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/aiBMAPoyVFk/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/aiBMAPoyVFk/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/aiBMAPoyVFk/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'FacingTheSunOfficial',
        liveBroadcastContent: 'none',
        publishTime: '2022-07-07T16:00:01Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'DC8ti3FkJipRAFWSN3iPbzsOVRw',
      id: {
        kind: 'youtube#video',
        videoId: 'lm13_XowEqI'
      },
      snippet: {
        publishedAt: '2018-07-23T14:00:05Z',
        channelId: 'UClgtSqIYSU2f7lu1dG_rMxg',
        title: 'БОРО ПЪРВИ ft. Mom4eto - ДА НЕ ПИТАТ [Official Video]',
        description:
          'Boro Purvi ft. Mom4eto - Da ne pitat [Official Video] Текст, аранжимент: Боро Първи, Mom4eto Видео: Emanuil Albert ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/lm13_XowEqI/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/lm13_XowEqI/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/lm13_XowEqI/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'FacingTheSunOfficial',
        liveBroadcastContent: 'none',
        publishTime: '2018-07-23T14:00:05Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'ky_w2ToJ9S0UxjKCQo7OQW7b4Lo',
      id: {
        kind: 'youtube#video',
        videoId: '1jCganZtPaQ'
      },
      snippet: {
        publishedAt: '2018-10-15T15:00:00Z',
        channelId: 'UClgtSqIYSU2f7lu1dG_rMxg',
        title: 'БОРО ПЪРВИ -  FREESTYLE [Official Video]',
        description:
          'Boro Purvi - Freestyle [Official Video] Текст, аранжимент: Боро Първи Видео: Emanuil Albert (http://bit.ly/emanuilalbert) Музика: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/1jCganZtPaQ/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/1jCganZtPaQ/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/1jCganZtPaQ/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'FacingTheSunOfficial',
        liveBroadcastContent: 'none',
        publishTime: '2018-10-15T15:00:00Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'xUS8irsdBbB77EjvhexfC2Z7xbY',
      id: {
        kind: 'youtube#video',
        videoId: 'y7oBFzYa7YQ'
      },
      snippet: {
        publishedAt: '2023-04-27T15:00:09Z',
        channelId: 'UClgtSqIYSU2f7lu1dG_rMxg',
        title: 'BORO PURVI - BUDALA 🙈🙉  [Official Video]',
        description:
          'Download/stream: https://presave.io/t/budala Booking & Media info: martin@twelves.bg Follow Boro Purvi Instagram: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/y7oBFzYa7YQ/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/y7oBFzYa7YQ/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/y7oBFzYa7YQ/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'FacingTheSunOfficial',
        liveBroadcastContent: 'none',
        publishTime: '2023-04-27T15:00:09Z'
      }
    }
  ]
}

export async function searchByQuery(
  query: string,
  nextPageToken: string | undefined
): Promise<z.TypeOf<typeof Response>> {
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
  return Response.parse(data)
}

const mockedFavs = {
  kind: 'youtube#videoListResponse',
  etag: '0HvO6slN81hF3g3gqMuTkhASstk',
  items: [
    {
      kind: 'youtube#video',
      etag: 'G44lPSkR0JSSpwAV4mAsx8iqNjQ',
      id: 'kFgqsgX6VMM',
      snippet: {
        publishedAt: '2023-12-01T16:06:29Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - долари (feat. KRISKO) (Lyric Video)',
        description:
          'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/\n\nDownload/stream: https://bfan.link/pzsip\n\nBooking & Media info: martin@twelves.bg\n\nFollow Boro Purvi\nInstagram: https://www.instagram.com/borobachkadosta/\nTikTok: https://www.tiktok.com/@borobachkadosta\nOfficial Website: https://borobachkadosta.com/\n\nFollow Krisko\nhttps://www.instagram.com/kriskobeats\nhttps://www.facebook.com/kriskoofficial\nhttps://www.tiktok.com/@kriskoofficial\n\nMusic by Nikola Stojovic\nLyrics by Boro Purvi, Krisko\nArrangement by Boro Purvi\nRecorded at SUPERSTUDIO\nhttps://www.instagram.com/superstudiobulgaria\nMixed & Master by Boro Purvi\nProduced by Boro Purvi & Twelves.\n\nShot & edited by https://www.instagram.com/broken_siemens\nStyling by https://www.instagram.com/vintaj.bg\nAnimation by https://www.instagram.com/boropurvi.onlinee\n\nAll rights reserved ©\nБОРО ПЪРВИ - dolari (с Криско)\n\n#BOROPURVI #DOLARI #BOROBACHKADOSTA #PZSIP #KRISKO',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/hqdefault.jpg',
            width: 480,
            height: 360
          },
          standard: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/sddefault.jpg',
            width: 640,
            height: 480
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/kFgqsgX6VMM/maxresdefault.jpg',
            width: 1280,
            height: 720
          }
        },
        channelTitle: 'BORO PURVI',
        tags: [
          'boro purvi',
          'boro 1',
          'boro',
          'боро първи',
          'БОРО ПЪРВИ',
          'боро 1',
          'боро',
          'песни за сватби и погребения',
          'пзсип',
          'pzsip',
          'pesni za svatbi i pogrebeniq',
          'криско',
          'долари',
          'krisko',
          'dolari'
        ],
        categoryId: '10',
        liveBroadcastContent: 'none',
        localized: {
          title: 'BORO PURVI - долари (feat. KRISKO) (Lyric Video)',
          description:
            'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/\n\nDownload/stream: https://bfan.link/pzsip\n\nBooking & Media info: martin@twelves.bg\n\nFollow Boro Purvi\nInstagram: https://www.instagram.com/borobachkadosta/\nTikTok: https://www.tiktok.com/@borobachkadosta\nOfficial Website: https://borobachkadosta.com/\n\nFollow Krisko\nhttps://www.instagram.com/kriskobeats\nhttps://www.facebook.com/kriskoofficial\nhttps://www.tiktok.com/@kriskoofficial\n\nMusic by Nikola Stojovic\nLyrics by Boro Purvi, Krisko\nArrangement by Boro Purvi\nRecorded at SUPERSTUDIO\nhttps://www.instagram.com/superstudiobulgaria\nMixed & Master by Boro Purvi\nProduced by Boro Purvi & Twelves.\n\nShot & edited by https://www.instagram.com/broken_siemens\nStyling by https://www.instagram.com/vintaj.bg\nAnimation by https://www.instagram.com/boropurvi.onlinee\n\nAll rights reserved ©\nБОРО ПЪРВИ - dolari (с Криско)\n\n#BOROPURVI #DOLARI #BOROBACHKADOSTA #PZSIP #KRISKO'
        },
        defaultAudioLanguage: 'bg'
      },
      statistics: {
        viewCount: '30844',
        likeCount: '1246',
        favoriteCount: '0',
        commentCount: '39'
      }
    },
    {
      kind: 'youtube#video',
      etag: 'odWTkLHdRu__rwq9xVOBNC2Y0yo',
      id: 'JP42Fw8fqxc',
      snippet: {
        publishedAt: '2023-12-01T16:06:17Z',
        channelId: 'UCqoMmy9aSZBmCcVAHdEOGNw',
        title: 'BORO PURVI - докато смъртта / ни раздели (Lyric Video)',
        description:
          'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/\n\nDownload/stream: https://bfan.link/pzsip\n\nBooking & Media info: martin@twelves.bg\n\nFollow Boro Purvi\nInstagram: https://www.instagram.com/borobachkadosta/\nTikTok: https://www.tiktok.com/@borobachkadosta\nOfficial Website: https://borobachkadosta.com/\n\nMusic by https://www.instagram.com/s.aeezakmi/\nLyrics by Boro Purvi\nArrangement by Boro Purvi\nRecorded at SUPERSTUDIO\nhttps://www.instagram.com/superstudiobulgaria\nMixed & Master by Boro Purvi\nProduced by Boro Purvi & Twelves.\n\nShot & edited by https://www.instagram.com/broken_siemens\nStyling by https://www.instagram.com/vintaj.bg\nAnimation by https://www.instagram.com/boropurvi.onlinee\n\nAll rights reserved ©\nБОРО ПЪРВИ - dokato smartta ni razdeli\n\n#BOROPURVI #BOROBACHKADOSTA #PZSIP',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/hqdefault.jpg',
            width: 480,
            height: 360
          },
          standard: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/sddefault.jpg',
            width: 640,
            height: 480
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/JP42Fw8fqxc/maxresdefault.jpg',
            width: 1280,
            height: 720
          }
        },
        channelTitle: 'BORO PURVI',
        tags: [
          'boro purvi',
          'boro 1',
          'boro',
          'боро първи',
          'БОРО ПЪРВИ',
          'боро 1',
          'боро',
          'песни за сватби и погребения',
          'пзсип',
          'pzsip',
          'pesni za svatbi i pogrebeniq'
        ],
        categoryId: '10',
        liveBroadcastContent: 'none',
        localized: {
          title: 'BORO PURVI - докато смъртта / ни раздели (Lyric Video)',
          description:
            'поръчай "Песни за сватби и погребения: http://borobachkadosta.com/product/pzsip/\n\nDownload/stream: https://bfan.link/pzsip\n\nBooking & Media info: martin@twelves.bg\n\nFollow Boro Purvi\nInstagram: https://www.instagram.com/borobachkadosta/\nTikTok: https://www.tiktok.com/@borobachkadosta\nOfficial Website: https://borobachkadosta.com/\n\nMusic by https://www.instagram.com/s.aeezakmi/\nLyrics by Boro Purvi\nArrangement by Boro Purvi\nRecorded at SUPERSTUDIO\nhttps://www.instagram.com/superstudiobulgaria\nMixed & Master by Boro Purvi\nProduced by Boro Purvi & Twelves.\n\nShot & edited by https://www.instagram.com/broken_siemens\nStyling by https://www.instagram.com/vintaj.bg\nAnimation by https://www.instagram.com/boropurvi.onlinee\n\nAll rights reserved ©\nБОРО ПЪРВИ - dokato smartta ni razdeli\n\n#BOROPURVI #BOROBACHKADOSTA #PZSIP'
        },
        defaultAudioLanguage: 'bg'
      },
      statistics: {
        viewCount: '35445',
        likeCount: '1748',
        favoriteCount: '0',
        commentCount: '72'
      }
    },
    {
      kind: 'youtube#video',
      etag: 'tf-K4kzg4xqgk3KHnpHW_SLnenM',
      id: 'm5yx_hRKBjE',
      snippet: {
        publishedAt: '2023-11-21T15:03:28Z',
        channelId: 'UCPOhQupz3MwGSIBG0OqVnAg',
        title: '2024 BMW XM - New Brutal SUV by Renegade Design',
        description:
          'BMW XM (2024) by Renegade Design \nhttps://www.instagram.com/renegade.design.world/\n\nEngine: V8, 4.4 L, 652 Ps, 800 Nm\nTop Speed: 270 km/h\n0-100 (km/h): 4.3 s\n\n#bmw',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/m5yx_hRKBjE/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/m5yx_hRKBjE/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/m5yx_hRKBjE/hqdefault.jpg',
            width: 480,
            height: 360
          },
          standard: {
            url: 'https://i.ytimg.com/vi/m5yx_hRKBjE/sddefault.jpg',
            width: 640,
            height: 480
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/m5yx_hRKBjE/maxresdefault.jpg',
            width: 1280,
            height: 720
          }
        },
        channelTitle: 'RoCars',
        tags: [
          'bmw xm',
          'xm',
          'bmw xm 2024',
          'bmw xm sound',
          'xm 2024',
          '2024 bmw xm',
          'bmw xm 2023',
          'new bmw',
          'bmw cars',
          'bmw suv',
          'bmw 2024',
          'bmw 2023',
          'rocars',
          'best luxury suv 2024'
        ],
        categoryId: '2',
        liveBroadcastContent: 'none',
        defaultLanguage: 'en',
        localized: {
          title: '2024 BMW XM - New Brutal SUV by Renegade Design',
          description:
            'BMW XM (2024) by Renegade Design \nhttps://www.instagram.com/renegade.design.world/\n\nEngine: V8, 4.4 L, 652 Ps, 800 Nm\nTop Speed: 270 km/h\n0-100 (km/h): 4.3 s\n\n#bmw'
        },
        defaultAudioLanguage: 'en'
      },
      statistics: {
        viewCount: '580559',
        likeCount: '14885',
        favoriteCount: '0',
        commentCount: '500'
      }
    }
  ],
  pageInfo: {
    totalResults: 3,
    resultsPerPage: 3
  }
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

  return Response.parse(data)
}
