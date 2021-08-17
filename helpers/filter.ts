import Post from "../schema/post"

function filter(d: any) {
  let post: Post
  let img
  let urls: string[] = []
  let ext

  d.children = d.children.map((p: any) => {
    if (p.data.crosspost_parent_list) {
      p.data.is_self = p.data.crosspost_parent_list[0].is_self
      p.data.post_hint = p.data.crosspost_parent_list[0].post_hint
      if (p.data.crosspost_parent_list[0].is_gallery) {
        p.data.is_gallery = true
        p.data.media_metadata = p.data.crosspost_parent_list[0].media_metadata
      }
    }
    return p
  })

  //remove all text posts
  d.children = d.children.filter((p: any) => !p.data.is_self)
  // d.children = d.children.filter((p: any) => p.data.crosspost_parent_list)

  //(for users) remove all comments
  d.children = d.children.filter((p: any) => p.kind === "t3")

  // p.data.post_hint === "image"
  d.children = d.children.filter(
    (p: any) =>
      p.data.is_gallery ||
      p.data.post_hint === "image" ||
      p.data.post_hint === "hosted:video"
  )

  d.children = d.children.map((p: any) => {
    // ? keep only links from specific domains
    urls = []
    if (p.data.is_video) {
      p.data.url = p.data.media.reddit_video.fallback_url
    }

    if (p.data.is_gallery && p.data.media_metadata) {
      Object.keys(p.data.media_metadata).map((k) => {
        ext = p.data.media_metadata[k].m.replace("image/", ".")
        urls.push("https://i.redd.it/" + p.data.media_metadata[k].id + ext)
        if (!p.data.ratio)
          p.data.ratio =
            p.data.media_metadata[k].s.x / p.data.media_metadata[k].s.y

        let newRatio =
          p.data.media_metadata[k].s.x / p.data.media_metadata[k].s.y
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
      if (p.data.crosspost_parent_list[0].is_video) {
        p.data.url =
          p.data.crosspost_parent_list[0].media.reddit_video.fallback_url
        p.data.is_video = true
      } else p.data.url = p.data.crosspost_parent_list[0].url
    }

    // post.author = "fobardoo"
    post = {
      // ...post,
      kind: p.kind,
      title: p.data.title,
      author: p.data.author,
      sub: p.data.subreddit,
      ups: p.data.ups,
      permalink: p.data.permalink,
      domain: p.data.domain,
      thumbnail: p.data.thumbnail,
      date: p.data.created,
      media: {
        url: p.data.url,
        urls: urls,
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

  return d
}

export default filter
