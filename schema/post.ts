type Post<M> = {
  infos: Infos
  media: M
}

type Media = {
  ratio: number
  nsfw: boolean
}

interface Image extends Media {
  type: "image"
  url: string
  thumbnail: string
}

interface Video extends Media {
  type: "video"
  poster: string
  thumbnail: string
  peek: string
  duration: number
  timestamp?: string
  url: string
  dash: string
}

interface Gallery extends Media {
  type: "gallery"
  thumbnails: string[]
  urls: string[]
  // ratios: number[]
}

interface Gif extends Media {
  type: "gif"
  thumbnail: string
  poster: string
  peek: string
  url: string
}

interface Infos {
  title: string
  author: string
  sub: string
  permalink: string
  ups: number
  comments: number
  date: number
}
export type { Post, Image, Video, Gallery, Gif, Media, Infos }
