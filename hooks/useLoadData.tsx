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

  console.log("!!!!!!!!rendering useLoadData with : ", params)

  useEffect(() => {
    if (!params.after) return
    console.log("111111111111111111111111111111111111111111 :", params)
    let posts
    async function getPage() {
      let d = await loadPage()
      console.log("%%%%%%%%%%%%%%%", d.children)
      if (d.children.length === 0) {
        console.log("6^^^^^^^^^^")
        getPage()
      } else {
        posts = [...data.posts, ...d.children]
        setData({ after: d.after, posts })
      }
    }
    getPage()
  }, [params.after])

  useEffect(() => {
    setData({ after: "", posts: [] })
    console.log("22222222222222222222222222222222222222222 data", data)

    async function getPage() {
      let d = await loadPage()
      if (d.children.length === 0) {
        console.log("6^^^^^^^^^^")
        getPage()
      } else {
        setData({ after: d.after, posts: d.children })
      }
    }
    getPage()
  }, [params.sub, params.sort, params.user, params.query])

  async function loadPage() {
    setLoading(true)
    setError(false)

    try {
      let r = await fetch(
        // {sub:'dd',sort:'new'}
        // [sub,sort]
        `${api}?` +
          Object.keys(params).reduce(
            (a, v) => a + v + "=" + params[v] + "&&",
            ""
          )
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
