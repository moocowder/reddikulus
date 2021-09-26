type Post<M> = {
  kind: string
  title: string
  author: string
  sub: string
  permalink: string
  // domain: string
  ups: number
  comments: number
  date: number
  // over_18: boolean
  // media: Image | Video | Gallery
  media: M
}

type Media = {
  type: "image" | "video" | "gallery"
  ratio: number
  // thumbnail?: undefined
  // poster?: undefined
  // url?: undefined
  // thumbnails?: undefined[]
  // urls?: undefined[]
  // peek?: undefined
  // duration?: undefined
  // timestamp?: undefined
}

interface Image extends Media {
  url: string
  thumbnail: string
}

interface Video extends Media {
  poster: string
  thumbnail: string
  peek: string
  duration: number
  timestamp?: string
  url: string
}

interface Gallery extends Media {
  thumbnails: string[]
  urls: string[]
}

export type { Post, Image, Video, Gallery }
