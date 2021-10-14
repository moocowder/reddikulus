import { useEffect, useState, useRef, RefObject } from "react"
import styles from "../styles/viewer.module.css"
import Media from "./media"
import Infos from "./Infos"
import Options from "./options"
import useTimedState from "../hooks/useTimedState"
import { Post } from "../schema/post"
import useEventListener from "../hooks/useEventListener"

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
  }

  interface HTMLDivElement {
    msRequestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
  }
}

interface Props {
  post: Post<any>
  move: { next: Function; prev: Function }
  close: Function
}
const Viewer = ({ post, move, close }: Props) => {
  const [display, setDisplay, cancel] = useTimedState(true)
  const [direction, setDirection] = useState<1 | -1 | null>(null)

  useEventListener("keydown", (e: any) => {
    switch (e.key) {
      case "Escape":
        close()
        document.body.style.overflow = "auto"
        break
      case "ArrowRight":
        next(e)
        break
      case "ArrowLeft":
        prev()
        break
    }
  })
  // const [optDisplay, setOptDisplay, optCancel] = useTimedState(true)
  let viewerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    setDisplay(true, 3000)
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

  function handleMouseMove() {
    // e.preventDefault()
    setDisplay(true, 3000)
  }

  function handleWheel(e: any) {
    e.preventDefault()
    setDisplay(false)
  }

  function next(e: any) {
    e.preventDefault()
    setDirection(1)
    move.next()
  }

  function prev() {
    setDirection(-1)
    move.prev()
  }

  function handleMouseDown(e: any) {
    if (e.button !== 1) return
    close()
    document.body.style.overflow = "auto"
  }

  function handleMouseEnter() {
    cancel()
  }

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => handleMouseMove()}
      onClick={(e) => prev()}
      onContextMenu={(e) => next(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      onWheel={(e) => handleWheel(e)}
      ref={viewerRef}
      style={{ cursor: display ? "" : "none" }}
    >
      <Infos
        onMouseEnter={() => handleMouseEnter()}
        opacity={display ? 1 : 0}
        ups={post.ups}
        title={post.title}
        permalink={post.permalink}
        sub={post.sub}
        author={post.author}
        comments={post.comments}
        date={post.date}
      />

      <Media media={post.media} direction={direction} />
      {/* {optDisplay && ( */}
      <Options
        close={close}
        maximize={maximize}
        minimize={minimize}
        download={download}
      />
      {/* )} */}
    </div>
  )
}

export default Viewer
