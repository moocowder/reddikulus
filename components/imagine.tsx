import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/imagine.module.css"

function Imagine({
  thumbnail,
  original,
}: {
  thumbnail: string
  original: string
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
        <img className={`${styles.original}`} src={original} />
      ) : (
        <img className={`${styles.thumbnail}`} src={thumbnail} />
      )}
    </>
  )
}
export default Imagine
