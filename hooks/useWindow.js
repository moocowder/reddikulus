import { useEffect, useState } from "react"

export default function useLoadMore(sub, after) {
  const [width, setWidth] = useState()

  //   const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("inside useefect custom hook")
    setWidth(window.innerWidth)
  }, [])

  return { width }
}
