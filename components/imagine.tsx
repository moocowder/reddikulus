import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/imagine.module.css"

function Imagine({
  thumbnail,
  original,
  onClick = () => {},
}: {
  thumbnail: string
  original: string
  onClick?: any
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const buffer = new Image()
    buffer.src = original
    buffer.onload = () => {
      setLoaded(true)
    }
  }, [original])

  return (
    <>
      {loaded ? (
        <img
          onClick={onClick}
          className={`${styles.original}`}
          src={original}
        />
      ) : (
        <img
          onClick={onClick}
          className={`${styles.thumbnail}`}
          src={thumbnail}
        />
      )}
    </>
  )
}
export default Imagine
