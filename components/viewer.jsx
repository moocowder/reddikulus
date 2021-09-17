import { useEffect, useState, useRef } from "react"
import styles from "../styles/viewer.module.css"
import Link from "next/link"
import Media from "../components/media"
import Infos from "./Infos"

const Viewer = ({ post, move, close, isVideo = false }) => {
  let [show, setShow] = useState(1)
  let timeout = useRef()
  let fullRef = useRef()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          close()
          document.body.style.overflow = "auto"
          break
        // case "ArrowRight":
        //   next(e)
        //   break
        // case "ArrowLeft":
        //   prev(e)
        //   break
      }
      // if (e.key !== "Escape") return
      // close()
      // document.body.style.overflow = "auto"
    })
  }, [post])

  function openFullscreen() {
    if (fullRef.current.requestFullscreen) {
      fullRef.current.requestFullscreen()
    } else if (fullRef.current.webkitRequestFullscreen) {
      /* Safari */
      fullRef.current.webkitRequestFullscreen()
    } else if (fullRef.current.msRequestFullscreen) {
      /* IE11 */
      fullRef.current.msRequestFullscreen()
    }
  }

  useEffect(() => {
    setShow(1)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)
  }, [post])

  function handleMouseMove(e) {
    e.preventDefault()

    setShow(1)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)
    return
  }

  function handleWheel(e) {
    e.preventDefault()
    setShow(0)
  }

  function next(e) {
    e.preventDefault()
    // if (e.target.localName === "a") return
    move.next()
  }

  function prev(e) {
    // if (e.target.localName === "svg" || e.target.localName === "path") return
    move.prev()
  }

  function handleMouseDown(e) {
    if (e.target.localName === "a") return
    if (e.button !== 1) return
    close()
    document.body.style.overflow = "auto"
  }

  function handleMouseEnter() {
    console.log(timeout.current)
    clearTimeout(timeout.current)
  }

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => handleMouseMove(e)}
      onClick={(e) => prev(e)}
      onContextMenu={(e) => next(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      onWheel={(e) => handleWheel(e)}
      // onKeyDown={(e) => alert("hh")}
      // onKeyPress={(e) => alert("hh")}
      // onKeyDown={(e) => {
      //   handleKeyDown(e)
      // tabIndex="0"
    >
      <Infos
        onMouseEnter={() => handleMouseEnter()}
        opacity={show}
        ups={post.ups}
        title={post.title}
        permalink={post.permalink}
        sub={post.sub}
        author={post.author}
        comments={post.comments}
        date={post.date}
      />

      <Media media={post.media} />
    </div>
  )
}

export default Viewer
