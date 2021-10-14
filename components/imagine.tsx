import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/imagine.module.css"

interface Props {
  thumbnail: string
  original?: string
  appeared?: () => void
}
function Imagine({ thumbnail, original = "", appeared = () => {} }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    if (!original) return
    const buffer = new Image()
    buffer.src = original
    buffer.onload = () => {
      setLoaded(true)
    }
  }, [original])

  return (
    <>
      {original && loaded ? (
        <img
          // importance="low"
          // onLoad={() => alert("loaded")}
          className={`${styles.original}`}
          src={original}
        />
      ) : (
        <img
          // importance="hight"
          onLoad={() => appeared()}
          className={`${styles.thumbnail}`}
          src={thumbnail}
        />
      )}
    </>
  )
}
export default Imagine
