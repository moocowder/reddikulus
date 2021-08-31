import Post from "../schema/post"

type Page = {
  after: string
  children: Child[]
}

type Child = {
  kind: string
  data: Data
}

type Data = {
  title: string
  author: string
  subreddit: string
  ups: number
  num_comments: number
  permalink: string
  domain: string
  created_utc: number
}

function filter(children: Child[]) {
  let post: Post
  let posts: Post[]
  let img
  let urls: string[] = []
  let thumbnails: string[] = []
  let ext

  children = children.map((p: any) => {
    if (p.data.crosspost_parent_list) {
      let cross = p.data.crosspost_parent_list[0]

      p.data.is_self = cross?.is_self
      p.data.post_hint = cross?.post_hint
      p.data.secure_media = cross?.secure_media
      if (cross?.is_gallery) {
        p.data.is_gallery = true
        p.data.media_metadata = cross?.media_metadata
      }
    }
    return p
  })

  //remove all text posts
  children = children.filter((p: any) => !p.data.is_self)
  // children = children.filter((p: any) => p.data.crosspost_parent_list)

  //(for users) remove all comments
  // children = children.filter((p: any) => p.kind === "t3")

  // p.data.post_hint === "image"
  children = children.filter(
    (p: any) =>
      p.data.is_gallery ||
      p.data.post_hint === "image" ||
      p.data.post_hint === "hosted:video"
  )

  posts = children.map((p: any) => {
    // ? keep only links from specific domains
    urls = []
    thumbnails = []
    if (p.data.is_video) {
      p.data.url = p.data.media.reddit_video.fallback_url
    }

    if (p.data.is_gallery && p.data.media_metadata) {
      Object.keys(p.data.media_metadata).map((k) => {
        let pic = p.data.media_metadata[k]
        // ext = p.data.media_metadata[k].m.replace("image/", ".")
        // urls.push("https://i.redd.it/" + p.data.media_metadata[k].id + ext)
        urls.push(pic.s.u.replace(/&amp;/g, "&"))
        thumbnails.push(pic.p[0].u.replace(/&amp;/g, "&"))
        if (!p.data.ratio) p.data.ratio = pic.s.x / pic.s.y

        let newRatio = pic.s.x / pic.s.y
        p.data.ratio = p.data.ratio < newRatio ? p.data.ratio : newRatio
      })
    } else if (p.data.preview) {
      img = p.data.preview?.images[0].source
      if (img) {
        p.data.ratio = img.width / img.height
      } else {
        p.data.ratio = 0.5
      }
    } else {
      p.data.ratio = 0.5
    }

    if (p.data.crosspost_parent_list) {
      if (p.data.crosspost_parent_list[0]?.is_video) {
        p.data.url =
          p.data.crosspost_parent_list[0]?.media?.reddit_video.fallback_url
        p.data.is_video = true
      } else p.data.url = p.data.crosspost_parent_list[0]?.url
    }

    // post.author = "fobardoo"
    post = {
      // ...post,
      kind: p.kind,
      title: p.data.title,
      author: p.data.author,
      sub: p.data.subreddit,
      ups: p.data.ups,
      comments: p.data.num_comments,
      permalink: p.data.permalink,
      // domain: p.data.domain,
      date: p.data.created,
      media: {
        thumbnail: p.data.preview?.images[0].resolutions[0]?.url?.replace(
          /&amp;/g,
          "&"
        ),
        poster: p.data.preview?.images[0].resolutions
          .pop()
          .url?.replace(/&amp;/g, "&"),
        url: p.data.url,
        urls: urls,
        thumbnails: thumbnails,
        peek: p.data.secure_media?.reddit_video?.scrubber_media_url,
        duration: p.data.secure_media?.reddit_video?.duration,
        ratio: p.data.ratio,
        type: p.data.is_video
          ? "video"
          : p.data.is_gallery
          ? "gallery"
          : "image",
      },
    }
    return post
  })

  return posts || []
}

export default filter
