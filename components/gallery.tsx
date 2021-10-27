import { useEffect, useState } from "react"
import styles from "../styles/gallery.module.css"
import Film from "./film"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { FaPlay, FaPause } from "react-icons/fa"
import { useRef } from "react"
import useTimedState from "../hooks/useTimedState"
import useWindowSize from "../hooks/useWindowSize"
import useEventListener from "../hooks/useEventListener"
import Icon from "./icon"

interface Props {
  urls: string[]
  thumbnails: string[]
}
function Gallery({ urls, thumbnails }: Props) {
  let [index, setIndex] = useState(0)
  let [run, setRun] = useState(true)
  let [center, setCenter] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const { height } = useWindowSize()

  let timeout: any = useRef()

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (run) pause()
      else play()
    }
    if (e.key === "ArrowUp") {
      setIndex(index - 1)
    }
    if (e.key === "ArrowDown") {
      setIndex(index + 1)
    }
  })

  const gap = 20
  const frameH = 120

  // const initH = (height - frameH) / 2
  const [h, setH] = useState<number>(300)

  const [filmDisplay, setFilmDisplay, cancelFilm] = useTimedState(true)
  const [iconDisplay, setIconDisplay] = useState(true)

  // const [run, setRun, cancelRun] = useTimedState()

  useEffect(() => {
    setIndex(0)
  }, [urls])

  useEffect(() => {
    if (!height) return
    setH((height - frameH) / 2)
    setCenter((height - frameH) / 2)
  }, [height])

  useEffect(() => {
    setH(center)
  }, [center])
  // let filmTimeout = useRef()
  useEffect(() => {
    if (index <= -1) setIndex(urls.length - 1)
    if (index >= urls.length) setIndex(0)
    // if (!run) return
    // if (!index) return

    setH(center - index * (frameH + gap))

    if (!run) return
    timeout.current = setTimeout(() => {
      // next()
      setIndex(index + 1)
    }, 4000)
    return () => clearTimeout(timeout.current)
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
    setIconDisplay(false)
  }

  function handleMouseEnter() {
    cancelFilm()
  }

  function play() {
    setIndex(index + 1)
    setRun(true)
  }

  function pause() {
    clearTimeout(timeout.current)
    setRun(false)
  }

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
      <Zoom setZoomed={setZoomed}>
        <Imagine thumbnail={thumbnails[index]} original={urls[index]} />
      </Zoom>
      {iconDisplay && (
        <Icon state={run ? "running" : "paused"} play={play} pause={pause} />
      )}

      <Film
        opacity={filmDisplay}
        onMouseEnter={() => handleMouseEnter()}
        thumbnails={thumbnails}
        index={index}
        setIndex={setIndex}
        h={h}
        gap={gap}
        frameH={frameH}
      />

      {!zoomed && (
        <>
          <span className={styles.number}>
            {index + 1}/{urls.length}
          </span>
          {run && <div key={urls[index]} className={styles.progress}></div>}
        </>
      )}
    </div>
  )
}
export default Gallery
