import { useEffect, useState } from "react"

export default function useWindow() {
  const [width, setWidth] = useState<number>()

  //   const [loading, setLoading] = useState(false)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return { width }
}
