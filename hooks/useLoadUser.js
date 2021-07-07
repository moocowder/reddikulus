import { useEffect, useState } from "react"

export default function useLoadMore(sub, after) {
  const [data, setData] = useState({ posts: [], after })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`/api/posts?sub=${sub}&&after=${after}`)
      .then((r) => r.json())
      .then((d) => {
        d.children = d.children.filter((c) => {
          return c.kind === "t3"
        })

        d.children = d.children.filter((c) => {
          return c.data.is_reddit_media_domain
        })

        d.children = d.children.map((c) => {
          let img = c.data.preview.images[0].source
          c.data.ratio = img.width / img.height
          return c
        })
        let posts = [...data.posts, ...d.children]
        setData({ after: d.after, posts })
      })
      .catch((e) => {
        console.log(e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [after])

  return { data, loading, error }
}
