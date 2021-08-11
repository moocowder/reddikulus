import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"
import filter from "../helpers/filter"

export default function useLoadData(sub: string, sort: string, after: string) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  console.log("rendering useLoadData")

  useEffect(() => {
    console.log("111111111111111111111111111111111111111111")
    let posts
    async function getPage() {
      let d = await loadPage(sub, sort, after)
      posts = [...data.posts, ...d.children]
      setData({ after: d.after, posts })
    }
    getPage()
  }, [after])

  useEffect(() => {
    setData({ after: "", posts: [] })
    console.log("22222222222222222222222222222222222222222")

    async function getPage() {
      let d = await loadPage(sub, sort, "")
      setData({ after: d.after, posts: d.children })
    }
    getPage()
  }, [sub, sort])

  async function loadPage(sub: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(`/api/posts?sub=${sub}&&sort=${sort}&&after=${after}`)
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
