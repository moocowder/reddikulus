import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"

export default function useLoadUser(sub: string, sort: string, after: string) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  console.log("rendering useLoadUser")

  useEffect(() => {
    let posts
    async function getPage() {
      let d = await loadPage(sub, sort, after)
      posts = [...data.posts, ...d.children]
      setData({ after: d.after, posts })
    }
    getPage()
  }, [after])

  // useEffect(() => {
  //   setData({ posts: [], after: "" })
  //   async function getPage() {
  //     let d = await loadPage(sub, sort, "")
  //     setData({ after: d.after, posts: d.children })
  //   }
  //   getPage()
  // }, [sort])

  function filter(d: any) {
    let post: Post
    let img
    let urls: string[] = []
    let ext

    //remove all text posts
    d.children = d.children.filter((p: any) => !p.data.is_self)

    //(for users) remove all comments
    d.children = d.children.filter((p: any) => p.kind === "t3")

    d.children = d.children.map((p: any) => {
      // ? keep only links from specific domains
      urls = []
      if (p.data.is_video) {
        p.data.url = p.data.media.reddit_video.fallback_url
      }

      if (p.data.is_gallery) {
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
        ups: p.data.ups,
        permalink: p.data.permalink,
        domain: p.data.domain,
        thumbnail: p.data.thumbnail,
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

  async function loadPage(sub: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(`/api/user?sub=${sub}&&sort=${sort}&&after=${after}`)
      let d = await r.json()

      console.log(">>>>", d)
      d = filter(d)
      return d
    } catch (e) {
      console.log(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, error }
}
