import { useEffect, useState } from "react"
import styles from "../styles/gallery.module.css"
import Film from "./film"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { FaPlay, FaPause } from "react-icons/fa"
import { useRef } from "react"

function Gallery({ urls, thumbnails, style, fullscreen = false }) {
  let [index, setIndex] = useState(0)
  let [progress, setProgress] = useState(0)
  let [loaded, setLoaded] = useState(false)
  let [run, setRun] = useState(true)
  let [show, setShow] = useState(true)

  let timeout
  let filmTimeout = useRef()
  useEffect(() => {
    if (!run) return
    timeout = setTimeout(() => {
      next()
    }, 4000)
    return () => clearTimeout(timeout)
  }, [index])

  useEffect(() => {
    setShow(true)
    clearTimeout(filmTimeout.current)
    filmTimeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)
  }, [urls])

  function handleMouseMove(e) {
    e.preventDefault()

    setShow(true)
    clearTimeout(filmTimeout.current)
    filmTimeout.current = setTimeout(() => {
      setShow(false)
    }, 3000)
    return
  }

  function handleWheel(e) {
    e.preventDefault()
    setShow(0)
  }

  function handleMouseEnter() {
    clearTimeout(filmTimeout.current)
  }

  // useEffect(() => {
  //   if (!run) clearTimeout(timeout)
  // }, [run])

  function next() {
    setIndex(index === urls.length - 1 ? 0 : index + 1)
  }
  // useEffect(() => {
  //   console.log(progress)
  //   if (progress >= 1) setProgress(0)
  //   let timeout = setTimeout(() => {
  //     setProgress(progress + 0.1)
  //   }, 300)
  //   return () => clearTimeout(timeout)
  // }, [progress])

  return (
    <div
      className={styles.wrapper}
      onMouseMove={(e) => handleMouseMove(e)}
      onWheel={(e) => handleWheel(e)}
    >
      <img
        style={{ zIndex: -1 }}
        className={styles.background}
        src={thumbnails[index]}
        alt=""
      />
      <Zoom>
        <Imagine thumbnail={thumbnails[index]} original={urls[index]} />
        {run ? (
          <div
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation()
              // pause()
              clearTimeout(timeout)
              setRun(false)
            }}
          >
            <FaPause />
          </div>
        ) : (
          <div
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation()
              next()
              setRun(true)
            }}
          >
            <FaPlay />
          </div>
        )}
      </Zoom>
      {/* {show && ( */}
      <Film
        opacity={show}
        onMouseEnter={() => handleMouseEnter()}
        thumbnails={thumbnails}
        index={index}
        setIndex={setIndex}
      />
      {/* )} */}

      {/* <span className={styles.number}>
        {index + 1} / {urls.length}
      </span> */}

      {/* <img
        // onLoad={setLoaded(true)}
        // style={{ transform: transform }}
        className={styles.media}
        src={urls ? urls[index] : ""}
      ></img> */}
      {run && <div key={urls[index]} className={styles.progress}></div>}
    </div>
  )
}
export default Gallery
