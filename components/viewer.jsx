import { useEffect, useState, useRef } from "react"
import styles from "../styles/viewer.module.css"
import Media from "../components/media"
import Infos from "./Infos"
import Options from "./options"

const Viewer = ({ post, move, close }) => {
  let [show, setShow] = useState(1)
  let timeout = useRef()
  let viewerRef = useRef()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) prev()
      // switch (e.key) {
      //   // case "Escape":
      //   //   close()
      //   //   document.body.style.overflow = "auto"
      //   //   break
      //   // case "ArrowRight":
      //   //   next(e)
      //   //   break
      //   // case "ArrowLeft":
      //   //   prev()
      //   //   break
      // }
    })
  }, [post])

  useEffect(() => {
    setShow(1)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)
  }, [post])

  function maximize() {
    if (viewerRef.current.requestFullscreen) {
      viewerRef.current.requestFullscreen()
    } else if (viewerRef.current.webkitRequestFullscreen) {
      /* Safari */
      viewerRef.current.webkitRequestFullscreen()
    } else if (viewerRef.current.msRequestFullscreen) {
      /* IE11 */
      viewerRef.current.msRequestFullscreen()
    }
  }

  function minimize() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  function download() {
    window.open(post.media.url)
  }

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
    move.next()
  }

  function prev() {
    move.prev()
  }

  function handleMouseDown(e) {
    if (e.button !== 1) return
    close()
    document.body.style.overflow = "auto"
  }

  function handleMouseEnter() {
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
      ref={viewerRef}
      style={{ cursor: show ? "" : "none" }}
      // onKeyPress={() => {
      //   alert("ff")
      // }}
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
      {show === 1 && (
        <Options
          close={close}
          maximize={maximize}
          minimize={minimize}
          download={download}
        />
      )}
    </div>
  )
}

export default Viewer
