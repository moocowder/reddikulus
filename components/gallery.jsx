import { useEffect, useState } from "react"
import styles from "../styles/gallery.module.css"
import Film from "./film"
import Imagine from "./imagine"

function Gallery({ urls, thumbnails, style, fullscreen = false }) {
  let [index, setIndex] = useState(0)
  let [progress, setProgress] = useState(0)
  let [loaded, setLoaded] = useState(false)

  let timeout
  useEffect(() => {
    timeout = setTimeout(() => {
      setIndex(index === urls.length - 1 ? 0 : index + 1)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [index])

  // useEffect(() => {
  //   console.log(progress)
  //   if (progress >= 1) setProgress(0)
  //   let timeout = setTimeout(() => {
  //     setProgress(progress + 0.1)
  //   }, 300)
  //   return () => clearTimeout(timeout)
  // }, [progress])

  return (
    <div className={styles.wrapper}>
      <img
        style={{ zIndex: -1 }}
        className={styles.background}
        src={thumbnails[index]}
        alt=""
      />
      <Film thumbnails={thumbnails} index={index} setIndex={setIndex} />
      <span className={styles.number}>
        {index + 1} / {urls.length}
      </span>
      <Imagine thumbnail={thumbnails[index]} original={urls[index]} />
      {/* <img
        // onLoad={setLoaded(true)}
        // style={{ transform: transform }}
        className={styles.media}
        src={urls ? urls[index] : ""}
      ></img> */}
      <div key={urls[index]} className={styles.progress}></div>
    </div>
  )
}
export default Gallery
