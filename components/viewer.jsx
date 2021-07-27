import { useEffect, useState } from "react"
import Cinema from "../components/Cinema"
import styles from "../styles/viewer.module.css"
import Link from "next/link"
import Media from "../components/media"
const Viewer = ({ post, move, close, isVideo = false }) => {
  let [translate, setTranslate] = useState({ x: 0, y: 0 })
  let [scale, setScale] = useState(1)
  let [start, setStart] = useState({ x: 0, y: 0 })
  let [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 })
  const a = 1.3

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          close()
          document.body.style.overflow = "auto"
          break
      }
      // if (e.key !== "Escape") return
      // close()
      // document.body.style.overflow = "auto"
    })
  }, [])

  function handleMouseMove(e) {
    e.preventDefault()

    if (scale === 1) return

    setTranslate({
      x: (-e.clientX + start.x) * scale + zoomTranslate.x,
      y: (-e.clientY + start.y) * scale + zoomTranslate.y,
    })
  }

  function handleWheel(e) {
    e.preventDefault()
    setStart({ x: e.clientX, y: e.clientY })

    let delta
    var xs = (e.clientX - translate.x) / scale
    var ys = (e.clientY - translate.y) / scale

    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    delta > 0 ? (scale *= a) : (scale /= a)

    if (scale < a) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    } else {
      setZoomTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setScale(scale)
    }
  }

  function next(e) {
    e.preventDefault()
    if (e.target.localName === "a") return
    move.next()
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  function prev(e) {
    if (e.target.localName === "svg" || e.target.localName === "path") return
    move.prev()
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  function format(number) {
    if (number <= 999) return number
    return (Math.round(number / 100) / 10).toFixed(1) + " k"
  }

  function handleMouseDown(e) {
    if (e.target.localName === "a") return
    if (e.button !== 1) return
    close()
    document.body.style.overflow = "auto"
  }

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        handleMouseMove(e)
      }}
      onClick={(e) => {
        prev(e)
      }}
      onContextMenu={(e) => {
        next(e)
      }}
      onMouseDown={(e) => {
        handleMouseDown(e)
      }}
      // onKeyDown={(e) => {
      //   handleKeyDown(e)
      // }}
      // tabIndex="0"
    >
      <a
        href={"https://reddit.com" + post.permalink}
        target="_blank"
        className={styles.title}
      >
        {post?.title}
      </a>
      <b className={styles.ups}>{format(post.ups)}</b>
      <Link href={`/u/${post.author}`}>
        <a className={styles.author}> {post.author}</a>
      </Link>
      {isVideo ? (
        <img className={styles.background} src={post.thumbnail} alt="" />
      ) : (
        <img className={styles.background} src={post.media.url} alt="" />
      )}
      <div
        className={styles.wrapper}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        <Media media={post.media} />
      </div>
    </div>
  )
}

export default Viewer
