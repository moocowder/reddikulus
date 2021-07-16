import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"

export default function useLoadData(sub: string, sort: string, after: string) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  console.log("rendering useLoadData")

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

  async function loadPage(sub: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(`/api/posts?sub=${sub}&&sort=${sort}&&after=${after}`)
      let d = await r.json()

      let post: Post
      let img
      d.children = d.children.filter((p: any) => !p.data.is_self)

      d.children = d.children.map((p: any) => {
        img = p.data.preview?.images[0].source
        if (img) p.data.ratio = img.width / img.height
        else p.data.ratio = 0.5

        if (p.data.is_video) {
          p.data.url = p.data.media.reddit_video.fallback_url
        }

        if (p.data.crosspost_parent_list) {
          if (p.data.crosspost_parent_list[0].is_video) {
            p.data.url =
              p.data.crosspost_parent_list[0].media.reddit_video.fallback_url
            p.data.is_video = true
          } else p.data.url = p.data.crosspost_parent_list[0].url
        }

        post = {
          kind: p.kind,
          title: p.data.title,
          author: p.data.author,
          ups: p.data.ups,
          permalink: p.data.permalink,
          domain: p.data.domain,
          url: p.data.url,
          thumbnail: p.data.thumbnail,
          ratio: p.data.ratio,
          is_video: p.data.is_video,
        }
        return post
      })

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
