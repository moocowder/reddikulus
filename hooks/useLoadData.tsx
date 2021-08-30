import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"
import filter from "../helpers/filter"

export default function useLoadData(
  api: string,
  params: { [key: string]: string }
) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!params.after) return
    console.log("111111111111111111111111111111111111111111 :", params)
    let posts
    async function getPage() {
      let d = await loadPage()
      console.log("%%%%%%%%%%%%%%%", d.posts)
      if (d?.posts.length === 0) {
        console.log("6^^^^^^^^^^")
        // getPage()
      } else {
        posts = [...data.posts, ...d?.posts]
        setData({ after: d.after, posts })
      }
    }
    getPage()
  }, [params.after])

  useEffect(() => {
    console.log("something changed here :", params)
    setData({ after: "", posts: [] })

    async function getPage() {
      let d = await loadPage()
      if (d?.posts.length === 0) {
        console.log("6^^^^^^^^^^")
        // getPage()
      } else {
        setData({ after: d.after, posts: d?.posts })
      }
    }
    getPage()
  }, [params.sub, params.sort, params.user, params.q])

  async function loadPage() {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(
        `${api}?` +
          Object.keys(params).reduce(
            (a, v) => a + v + "=" + params[v] + "&&",
            ""
          )
      )
      let d = await r.json()
      let ps = filter(d.children)
      // d = {after: d.after}
      return { posts: ps, after: d.after }
    } catch (e) {
      console.log(">>>>>>>>>>>>>>", e)
      setError(true)
      return { posts: [], after: "" }
    } finally {
      setLoading(false)
    }
  }

  console.log("use load data returned : ", { data, loading, error })
  return { data, loading, error }
}
