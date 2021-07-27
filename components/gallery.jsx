import { useEffect, useState } from "react"
import styles from "../styles/gallery.module.css"

function Gallery({ urls, style, onClick, fullscreen = false }) {
  let [index, setIndex] = useState(0)
  let [progress, setProgress] = useState(0)
  let [loaded, setLoaded] = useState(false)
  useEffect(() => {
    console.log("..................")
    let timeout = setTimeout(() => {
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
      <img className={styles.background} src={urls[index]} alt="" />

      <span className={styles.number}>
        {index + 1} / {urls.length}
      </span>
      <img
        // onLoad={setLoaded(true)}
        className={styles.media}
        onClick={onClick}
        src={urls ? urls[index] : ""}
      ></img>
      <div key={urls[index]} className={styles.progress}></div>
    </div>
  )
}
export default Gallery
