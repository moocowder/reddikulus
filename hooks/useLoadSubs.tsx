import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

interface Data {
  after: string
  subs: Sub[]
}

type Sub = {
  name: string
  icon: string
  subscribers: number
}

function useLoadSubs(q: string, after: string) {
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
        params: { q, include_over_18: "on", limit: 12, after },
      })
      let poo = r.data.data.children.map((c: any) => {
        return {
          name: c.data.display_name,
          icon: c.data.community_icon.replace(/\?.*/, "") || c.data.icon_img,
          subscribers: c.data.subscribers,
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
