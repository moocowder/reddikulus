import Cinema from "./Cinema"
import Gallery from "./gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { CgSpinnerTwo } from "react-icons/cg"
import {
  Gif as GifType,
  Image,
  Video,
  Gallery as GalleryType,
} from "../schema/post"
import { useEffect, useRef, useState } from "react"
import Gif from "../components/gif"
import useTimedState from "../hooks/useTimedState"

interface Props {
  media: GifType | Video | Image | GalleryType
  direction: 1 | -1 | null
}

function Media({ media, direction }: Props) {
  const [loading, setLoading] = useState(true)
  const [pos, setPos] = useState("0px")
  const ref = useRef<HTMLDivElement>(null)
  // const [show, setShow] = useState(true)
  const [show, setShow, cancel] = useTimedState(false)
  // const [d, setD] = useState(1)
  // let d : 1 | -1 | null = null
  const [anime, setAnime] = useState<1 | -1 | null>(null)
  const [alter, setAlter] = useState<boolean>(true)
  useEffect(() => {
    setLoading(true)
    // setAnime(null)
    setAlter(!alter)
    console.log(alter)
    // setAnime(direction)
    // setPos("100vw")
    // setShow(false)
    // setD(d * -1)
  }, [media])

  // useEffect(() => {
  //   alert(anime)
  //   if (anime === null) {
  //     setAnime(1)
  //   }
  // }, [anime])
  // useEffect(() => {
  //   if (!show) setShow(true)
  // }, [show])
  // useEffect(() => {
  //   if (pos === "100vw" || pos === "-100vw") setPos("0px")
  //   // if(pos === '-100vw')
  // }, [pos])

  // useEffect(() => {
  //   if (ref.current?.style.left === "100vw") setShow(true)
  // }, [ref.current?.style.left])
  useEffect(() => {
    console.log(ref.current?.getClientRects()[0])
    if (ref.current?.getClientRects()[0].left !== 0) setShow(true)
    // console.log(ref.current?.getClientRects()[0].left)

    // setTimeout(() => {
    // if (!show && ) setShow(true)
    // }, 5)
  }, [ref.current?.getClientRects()[0].left])
  // if (!show) return null
  return (
    <div
      ref={ref}
      // onMouseDown={() => setD(d * -1)}
      // key={Math.random()}
      // key={media.url}
      className={`${styles.media} ${anime === 1 && styles.right} ${
        direction === -1 && alter && styles.left
      } ${direction === -1 && !alter && styles.yassar}`}
      // onAnimationStart={() => alert("animation")}
      // className={styles.media}
      // translate={}
      // style={{ left: show ? "100vh" : "0px" }}
      // style={{ left: show ? "0" : "100vw", transition: show ? "0.5s" : "none" }}
    >
      {media.type === "video" && (
        <Cinema
          src={media.url}
          thumbnail={media.thumbnail}
          duration={media.duration}
          dash={media.dash}
        />
      )}
      {media.type === "image" && (
        <>
          <img src={media.thumbnail} className={styles.background} alt="" />
          <Zoom>
            <Imagine
              thumbnail={media.thumbnail}
              original={media.url}
              appeared={() => setLoading(false)}
            />
          </Zoom>
        </>
      )}
      {media.type === "gallery" && (
        <Gallery urls={media.urls} thumbnails={media.thumbnails} />
      )}
      {media.type === "gif" && (
        <Gif thumbnail={media.thumbnail} url={media.url} />
      )}

      {loading && <CgSpinnerTwo className={styles.spinner} />}
    </div>
  )
}
export default Media
