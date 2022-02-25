import { useEffect, useState } from "react"
import { Post } from "../schema/post"
import Data from "../schema/data"
import process from "../helpers/process"
import request from "../utils/request"

export default function useLoadData(
  api: string,
  sort: string,
  after: string,
  params?: { [key: string]: string }
) {
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!after) return

    let posts
    async function getPage() {
      let d = await loadPage(api, sort, after)
      posts = [...data.posts, ...d?.posts]
      setData({ after: d.after, posts })
    }
    getPage()
  }, [after])

  useEffect(() => {
    // alert(api)
    // setData({ after: "", posts: [] })

    async function getPage() {
      let d = await loadPage(api, sort, "")
      // alert(after)
      console.log("data>>>: ", d?.posts)
      setData({ after: d.after, posts: d?.posts })
    }
    getPage()
  }, [api, sort])

  async function loadPage(api: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      let d
      d = await request(api.replace("SORT", sort).replace("AFTER", after))

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

  return { data, loading, error }
}
