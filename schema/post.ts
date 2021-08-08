type Post = {
  kind: string
  title: string
  author: string
  sub: string
  permalink: string
  domain: string
  ups: number
  thumbnail: string
  date: string
  media: Media
}

type Media = {
  type: "image" | "video" | "gallery"
  url: string
  urls?: string[]
  ratio: number
  timestamp?: string
}
export default Post
