import { useEffect, useState } from "react"
import { Post } from "../schema/post"
import Data from "../schema/data"
import process from "../helpers/process"
import request from "../utils/request"

export default function useLoadData(
  api: string,
  params: { [key: string]: string }
) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    if (!params.after) return
    console.log("useLoadData :: after changed :: ", params.after)
    // console.log("111111111111111111111111111111111111111111 :", params)
    let posts
    async function getPage() {
      let d = await loadPage()
      posts = [...data.posts, ...d?.posts]
      setData({ after: d.after, posts })
      // console.log("%%%%%%%%%%%%%%%", d.posts)
      // if (d?.posts.length === 0) {
      //   console.log("6^^^^^^^^^^")
      //   // getPage()
      // } else {
      //   posts = [...data.posts, ...d?.posts]
      //   setData({ after: d.after, posts })
      // }
    }
    getPage()
  }, [params.after])

  useEffect(() => {
    params = { ...params, after: "" }
    console.log("useLoadData :: state :: ", params)
    // console.log("something changed here :", params)
    setData({ after: "", posts: [] })

    async function getPage() {
      let d = await loadPage()
      // if (d.posts.length === 0)
      setData({ after: d.after, posts: d?.posts })

      // if (d?.posts.length === 0) {
      //   console.log("6^^^^^^^^^^")
      //   // getPage()
      // } else {
      //   setData({ after: d.after, posts: d?.posts })
      // }
    }
    getPage()
  }, [params.sub, params.sort, params.user, params.q])

  async function loadPage() {
    setLoading(true)
    setError(false)

    try {
      // let r = await fetch(
      //   `${api}?` +
      //     Object.keys(params).reduce(
      //       (a, v) => a + v + "=" + params[v] + "&&",
      //       ""
      //     )
      // )
      // let d = await r.json()
      let d
      if (api === "/api/posts")
        d = await request(`r/${params.sub}/${params.sort}`, params)
      else d = await request(api, params)

      let ps = d.data.children
        .map((d: any) => process(d.data))
        .filter((r: any) => r !== null)

      return { posts: ps, after: d.data.after }
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
