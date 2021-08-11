import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"
import filter from "../helpers/filter"

export default function useLoadFeed(
  token: string,
  sort: string,
  after: string
) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  console.log("rendering useLoadFeed")

  useEffect(() => {
    console.log("111111111111111111111111111111111111111111")
    let posts
    async function getPage() {
      let d = await loadPage(token, sort, after)
      posts = [...data.posts, ...d.children]
      setData({ after: d.after, posts })
    }
    getPage()
  }, [after])

  useEffect(() => {
    setData({ posts: [], after: "" })
    async function getPage() {
      let d = await loadPage(token, sort, "")
      setData({ after: d.after, posts: d.children })
    }
    getPage()
  }, [sort])

  async function loadPage(token: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(
        `/api/feed?token=${token}&&sort=${sort}&&after=${after}`
      )
      let d = await r.json()

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
