import { useEffect, useState } from "react"

export default function useWindow(sub, after) {
  const [width, setWidth] = useState()

  //   const [loading, setLoading] = useState(false)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return { width }
}
