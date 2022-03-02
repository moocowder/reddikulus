import { useEffect, useState } from "react"
import styles from "../styles/album.module.css"
import { IoLayers } from "react-icons/io5"
import Imagine from "./imagine"

interface Props {
  thumbnails: string[]
  originals: string[]
}

function Album({ thumbnails, originals }: Props) {
  let [index, setIndex] = useState(0)
  let [hover, setHover] = useState(false)
  let [loaded, setLoaded] = useState(false)

  let timeout: any

  useEffect(() => {
    if (!hover) return
    timeout = setTimeout(() => {
      setLoaded(false)
      setIndex(index === thumbnails.length - 1 ? 0 : index + 1)
    }, 300)
  }, [hover])

  useEffect(() => {
    if (!hover) return
    if (!loaded) return
    timeout = setTimeout(() => {
      setLoaded(false)
      setIndex(index === thumbnails.length - 1 ? 0 : index + 1)
    }, 1000)
  }, [loaded])

  function current(index: number) {
    if (loaded) return index + 1
    else if (index === 0) return thumbnails.length
    else return index
  }

  return (
    <div
      className={styles.album}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        clearTimeout(timeout)
        setHover(false)
      }}
    >
      {!hover && <IoLayers className={`${styles.icon} `} />}

      <span className={styles.number}>
        {current(index)}/{thumbnails.length}
      </span>

      <img className={styles.background} src={thumbnails[index]} alt="" />

      <Imagine
        thumbnail={thumbnails[index]}
        original={originals[index]}
        appeared={() => setLoaded(true)}
      />
    </div>
  )
}
export default Album
