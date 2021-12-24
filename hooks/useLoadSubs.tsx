import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import UserContext from "../contexts/userContext"

interface Data {
  after: string
  subs: Sub[]
}

type Sub = {
  name: string
  icon: string
  subscribers: number
  color: string
}

function useLoadSubs(q: string, after: string) {
  const [user, setUser] = useContext(UserContext)
  const [data, setData] = useState<Data>({ after: "", subs: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const url = "https://www.reddit.com/subreddits/search.json"

  useEffect(() => {
    if (!after) return
    async function getPage() {
      let d = await loadPage()
      setData({ after: d?.after, subs: [...data.subs, ...d?.subs] })
    }
    getPage()
  }, [after])

  useEffect(() => {
    // setData({ after: "", subs: [] })
    after = ""
    async function getPage() {
      let d = await loadPage()
      setData({ after: d?.after, subs: d?.subs })
    }
    getPage()
  }, [q])

  async function loadPage() {
    setLoading(true)
    setError(false)
    try {
      let r = await axios({
        method: "GET",
        url: url,
        params: { q, include_over_18: user.nsfw, limit: 7, after },
      })
      let poo = r.data.data.children
        // .filter((c: any) => {
        //   return (
        //     c.data.allow_galleries ||
        //     c.data.allow_videogifs ||
        //     c.data.allow_videos ||
        //     c.data.allow_images
        //   )
        // })
        .map((c: any) => {
          return {
            name: c.data.display_name,
            icon: c.data.community_icon.replace(/\?.*/, "") || c.data.icon_img,
            subscribers: c.data.subscribers,
            color:
              c.data.primary_color ||
              c.data.key_color ||
              c.data.banner_background_color,
          }
        })

      return { after: r.data.data.after, subs: poo }
    } catch (e) {
      console.log("erreur : ", e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  console.log(data)
  return { data, loading, error }
}
export default useLoadSubs
