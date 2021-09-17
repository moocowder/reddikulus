type Post = {
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
  media: Media
}

type Media = {
  type: "image" | "video" | "gallery"
  thumbnail: string
  poster?: string
  url: string
  thumbnails?: string[]
  urls?: string[]
  peek?: string
  duration?: number
  ratio: number
  timestamp?: string
}

// interface Media {
//   // url: string
//   ratio: string
// }

// interface Image extends Media {
//   url: string
//   thumbnail: string
// }

// interface Video extends Media {
//   url: string
//   thumbnail: string
//   peek: string
//   timestamp: string
// }

// interface Gallery extends Media {
//   urls: string[]
//   thumbnails: string[]
// }
export default Post
