import { useEffect, useState } from "react"
import styles from "../styles/gallery.module.css"
import Film from "./film"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { FaPlay, FaPause } from "react-icons/fa"
import { useRef } from "react"
import useTimedState from "../hooks/useTimedState"

interface Props {
  urls: string[]
  thumbnails: string[]
}
function Gallery({ urls, thumbnails }: Props) {
  let [index, setIndex] = useState(0)
  let [progress, setProgress] = useState(0)
  let [loaded, setLoaded] = useState(false)
  let [run, setRun] = useState(true)
  const [h, setH] = useState(300)
  const gap = 20
  const frameH = 120

  const [filmDisplay, setFilmDisplay, cancelFilm] = useTimedState(true)
  // const [run, setRun, cancelRun] = useTimedState()

  let timeout: any
  // let filmTimeout = useRef()
  useEffect(() => {
    if (!run) return
    // if (!index) return
    timeout = setTimeout(() => {
      // next()
      moveTo(index + 1)
    }, 4000)

    return () => clearTimeout(timeout)
  }, [index])

  useEffect(() => {
    setFilmDisplay(true, 3000)
  }, [urls])

  function handleMouseMove(e: any) {
    e.preventDefault()
    setFilmDisplay(true, 3000)
  }

  function handleWheel(e: any) {
    e.preventDefault()
    setFilmDisplay(false)
  }

  function handleMouseEnter() {
    cancelFilm()
  }

  // useEffect(() => {
  //   if (!run) clearTimeout(timeout)
  // }, [run])

  // function next() {
  //   setIndex(index === urls.length - 1 ? 0 : index + 1)
  // }

  function moveTo(i: number) {
    if (i === urls.length) {
      setH(300)
      setIndex(0)
    } else {
      setH(h + (index - i) * (frameH + gap))
      setIndex(i)
    }
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
              // next()
              moveTo(index + 1)
              setRun(true)
            }}
          >
            <FaPlay />
          </div>
        )}
      </Zoom>

      <Film
        opacity={filmDisplay}
        onMouseEnter={() => handleMouseEnter()}
        thumbnails={thumbnails}
        index={index}
        // setIndex={setIndex}
        moveTo={(i) => moveTo(i)}
        h={h}
        gap={gap}
        frameH={frameH}
      />

      {/* <span className={styles.number}>
        {index + 1} / {urls.length}
      </span> */}

      {run && <div key={urls[index]} className={styles.progress}></div>}
    </div>
  )
}
export default Gallery
