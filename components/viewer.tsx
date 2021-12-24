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
  setInfos: Function
  fullscreen: boolean
  setFullscreen: Function
  children: any
}

const Viewer = ({
  post,
  move,
  close,
  setInfos,
  fullscreen,
  setFullscreen,
  children,
}: Props) => {
  // const [display, setDisplay, cancel] = useTimedState<boolean>(true)
  const [optDisplay, setOptDisplay, cancelOpt] = useTimedState<boolean>(false)
  const [direction, setDirection] = useState<1 | -1 | null>(null)

  useEventListener("keydown", (e: any) => {
    switch (e.key) {
      case "Escape":
        alert("yay")
        e.preventDefault()
        // setFullscreen(false)
        // minimize()
        close()
        break
      case "ArrowRight":
        next(e)
        break
      case "ArrowLeft":
        prev()
        break
    }
  })
  useEventListener("mozfullscreenchange", () => {
    alert("changed")
  })
  let viewerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    // setDisplay(true, false, 3000)
    setInfos(post.infos, false, 5000)
  }, [post])

  useEffect(() => {
    if (fullscreen) maximize()
    else if (
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement
    )
      minimize()
  }, [fullscreen])

  // useEffect(() => {
  //   if (display) setInfos(post.infos)
  //   else setInfos(null)
  // }, [display])

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
    alert("exiting")
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
    // setDisplay(true, false, 3000)
    setInfos(post.infos, null, 5000)
    setOptDisplay(true, false, 500)
  }

  function handleWheel(e: any) {
    e.preventDefault()
    // setDisplay(false)
    setInfos(null)
    setOptDisplay(false)
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
    if (e.button === 1) {
      close()
    }
  }

  // function handleMouseEnter() {
  //   cancel()
  // }

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => handleMouseMove()}
      onClick={(e) => prev()}
      onContextMenu={(e) => next(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      onWheel={(e) => handleWheel(e)}
      ref={viewerRef}
      // style={{ cursor: display ? "" : "none" }}
    >
      {children}
      <Media media={post.media} direction={direction} />
      {/* {optDisplay && ( */}
      <Options
        close={close}
        // maximize={() => {
        //   setFullscreen(true)
        //   maximize()
        // }}
        // minimize={() => {
        //   setFullscreen(false)
        //   minimize()
        // }}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        download={download}
        onMouseEnter={() => cancelOpt()}
      />
      {/* )} */}
    </div>
  )
}

export default Viewer
