import { useEffect, useState } from "react"
import Post from "../schema/post"
import Data from "../schema/data"
import filter from "../helpers/filter"
import { useContext } from "react"
import UserContext from "../contexts/userContext"

//search nsfw not working because rquest sent before user is return from context
export default function useLoadData(
  query: string,
  sort: string,
  after: string
) {
  const [user, setUser] = useContext(UserContext)
  const [data, setData] = useState<Data>({ posts: [], after: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  console.log("rendering useLoadSearch")

  useEffect(() => {
    let posts
    async function getPage() {
      let d = await loadPage(query, sort, after)
      posts = [...data.posts, ...d.children]
      setData({ after: d.after, posts })
    }
    getPage()
  }, [after])

  useEffect(() => {
    setData({ posts: [], after: "" })
    async function getPage() {
      let d = await loadPage(query, sort, "")
      setData({ after: d.after, posts: d.children })
    }
    getPage()
  }, [sort])

  async function loadPage(query: string, sort: string, after: string) {
    setLoading(true)
    setError(false)

    try {
      console.log("seriously", user)
      let r = await fetch(
        `/api/search?q=${query}&&sort=${sort}&&after=${after}&&nsfw=${user.nsfw}`
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
