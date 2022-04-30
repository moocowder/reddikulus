import { Post, Image, Video, Gallery, Gif, Media } from "../schema/post"

type Data = {
  title: string
  author: string
  subreddit: string
  ups: number
  num_comments: number
  permalink: string
  domain: string
  created_utc: number
  over_18: boolean
  crosspost_parent_list?: any
  is_self: boolean
  post_hint: string
  secure_media: any
  is_gallery?: boolean
  media_metadata?: any
  media: any
  is_video: boolean
  url: string
  preview: any
  created: number
  all_awardings: any[]
}

function process(data: Data) {
  let post: Post<null | Gallery | Image | Video | Gif>
  try {
    post = {
      infos: {
        title: data.title,
        author: data.author,
        sub: data.subreddit,
        ups: data.ups,
        comments: data.num_comments,
        permalink: data.permalink,
        date: data.created,
        awards: data.all_awardings.map((a) => {
          return { icon: a.resized_icons[1]?.url, count: a.count }
        }),
      },
      media: null,
    }

    // if (data.over_18) return null

    if (data.crosspost_parent_list) {
      let cross = data.crosspost_parent_list[0]

      data.is_self = cross?.is_self
      data.post_hint = cross?.post_hint
      data.secure_media = cross?.secure_media
      data.preview = cross?.preview
      if (cross?.is_gallery) {
        data.is_gallery = true
        data.media_metadata = cross?.media_metadata
      }
      if (cross?.is_video) {
        // data.url =
        //   cross?.media?.reddit_video.fallback_url
        // cross?.media ||
        data.media = cross?.media
        data.is_video = true
      } else data.url = cross?.url
    }

    if (data.is_self) return null

    if (
      !data.is_gallery &&
      data.post_hint !== "image" &&
      data.post_hint !== "hosted:video" &&
      data.domain !== "i.redd.it"
    )
      return null
    //   if (data.is_video) data.url = data.media.reddit_video.fallback_url
    if (data.post_hint === "image") {
      if ("mp4" in data.preview?.images[0].variants) post.media = gif(data)
      else post.media = image(data)
    } else if (data.is_video) post.media = video(data)
    else if (data.is_gallery && data.media_metadata) post.media = gallery(data)
    else {
      // alert("media is null " + post.infos.permalink)
      return null
    }
    return post
  } catch (e) {
    // alert(e)
    return null
  }
}

function gallery(data: Data): Gallery {
  let pic
  let g: Gallery = {
    type: "gallery",
    ratio: 0,
    thumbnails: [],
    urls: [],
    nsfw: data.over_18,
  }
  Object.keys(data.media_metadata).map((k) => {
    pic = data.media_metadata[k]
    if (!pic.s) return
    // if (!pic.s) alert("pic.s " + data.permalink)

    // if (!pic.s.u) alert("pic.s.u " + data.permalink)
    g.urls.push(pic.s.u || pic.s.gif)
    // if (!pic.p[0]) alert("pic.p[0] " + data.permalink)
    g.thumbnails.push(pic.p[0].u)

    if (g.ratio === 0) g.ratio = pic.s.x / pic.s.y
    // let newRatio = pic.s.x / pic.s.y
    g.ratio = g.ratio < pic.s.x / pic.s.y ? g.ratio : pic.s.x / pic.s.y
  })
  return g
}

function video(data: Data): Video {
  let img
  let v: Video = {
    type: "video",
    ratio: 0,
    duration: data.secure_media?.reddit_video?.duration,
    peek: data.secure_media?.reddit_video?.scrubber_media_url,
    poster: data.preview?.images[0].resolutions
      .pop()
      .url?.replace(/&amp;/g, "&"),
    thumbnail: data.preview?.images[0].resolutions[0]?.url,
    url: data.media.reddit_video.fallback_url,
    timestamp: "",
    dash: data.secure_media?.reddit_video?.dash_url,
    nsfw: data.over_18,
  }
  img = data.preview?.images[0].source
  // if (!img) alert("no img : " + data.permalink)
  v.ratio = img.width / img.height
  return v
}

function image(data: Data): Image {
  let img
  let i: Image = {
    ratio: 0,
    type: "image",
    url: data.url,
    thumbnail: data.preview?.images[0].resolutions[0]?.url?.replace(
      /&amp;/g,
      "&"
    ),
    nsfw: data.over_18,
  }
  img = data.preview?.images[0].source
  i.ratio = img.width / img.height
  return i
}

function gif(data: Data): Gif {
  let img
  let g: Gif = {
    type: "gif",
    ratio: 0,
    thumbnail: data.preview?.images[0].resolutions[0]?.url,
    poster: data.preview?.images[0].source?.url,
    peek: data.preview?.images[0].variants?.mp4?.resolutions[0]?.url,
    url: data.preview?.images[0].variants?.mp4?.source?.url,
    nsfw: data.over_18,
  }
  img = data.preview?.images[0].source
  g.ratio = img.width / img.height
  return g
}
export default process
