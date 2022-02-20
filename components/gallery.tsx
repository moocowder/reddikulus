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
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  const [filmDisplay, setFilmDisplay, cancelFilm] = useTimedState(true)
  const [iconDisplay, setIconDisplay, cancelIcon] = useTimedState(true)

  const { height } = useWindowSize()
  let timeout: any = useRef()
  const gap = 20
  const frameH = 120
  const [h, setH] = useState<number>(0)

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

  useEffect(() => {
    setIndex(0)
  }, [urls])

  useEffect(() => {
    if (zoomed) pause()
  }, [zoomed])

  useEffect(() => {
    if (!height) return
    setH((height - frameH) / 2)
    setCenter((height - frameH) / 2)
  }, [height])

  useEffect(() => {
    setH(center)
  }, [center])

  useEffect(() => {
    if (index <= -1) setIndex(urls.length - 1)
    if (index >= urls.length) setIndex(0)

    setH(center - index * (frameH + gap))

    if (!run) return
    timeout.current = setTimeout(() => {
      setIndex(index + 1)
    }, 4000)
    return () => clearTimeout(timeout.current)
  }, [index])

  useEffect(() => {
    setFilmDisplay(true, false, 5000)
    setIconDisplay(true, false, 1000)
  }, [urls])

  function handleMouseMove(e: any) {
    e.preventDefault()
    setFilmDisplay(true, false, 5000)
    setIconDisplay(true, false, 1000)
  }

  // function handleWheel(e: any) {
  //   // e.preventDefault()
  //   // setFilmDisplay(false)
  //   // setIconDisplay(false)
  // }

  function play() {
    setRun(true)
    setIndex(index + 1)
  }

  function pause() {
    clearTimeout(timeout.current)
    setRun(false)
  }

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (run) pause()
      else play()
      setWheeled(true, false, 300)
    }
  }

  return (
    <div
      className={styles.gallery}
      onMouseMove={(e) => handleMouseMove(e)}
      onWheel={(e) => handleWheel(e)}
    >
      <img className={styles.background} src={thumbnails[index]} alt="" />
      <Zoom setZoomed={setZoomed}>
        <Imagine thumbnail={thumbnails[index]} original={urls[index]} />
      </Zoom>

      {!zoomed && (
        <>
          {filmDisplay && (
            <Film
              onMouseEnter={() => cancelFilm()}
              thumbnails={thumbnails}
              index={index}
              setIndex={setIndex}
              h={h}
              gap={gap}
              frameH={frameH}
            />
          )}

          {iconDisplay && (
            <Icon
              state={run ? "running" : "paused"}
              setState={(s: string) => {
                s === "running" ? play() : pause()
              }}
              onMouseEnter={() => setIconDisplay(true)}
            />
          )}
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
