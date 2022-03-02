import { useEffect, useState, useRef } from "react"
import styles from "../styles/viewer.module.css"
import Media from "./media"
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
  const [optDisplay, setOptDisplay, cancelOpt] = useTimedState<boolean>(false)
  const [help, setHelp] = useState(false)

  useEventListener("keydown", (e: any) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault()
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

  useEffect(() => {
    if (fullscreen) {
      setFullscreen(false)
      maximize()
    }
  }, [])

  useEventListener("fullscreenchange", () => {
    setFullscreen(!fullscreen)
  })

  let viewerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    setInfos(post.infos, false, 5000)
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
    setInfos(post.infos, null, 5000)
    setOptDisplay(true, false, 500)
  }

  function handleWheel(e: any) {
    e.preventDefault()
    setInfos(null)
    setOptDisplay(false)
  }

  function next(e: any) {
    e.preventDefault()
    move.next()
  }

  function prev() {
    move.prev()
  }

  function handleMouseDown(e: any) {
    if (e.button === 1) {
      close()
    }
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
    >
      {children}
      <Media media={post.media} />
      {optDisplay && (
        <Options
          close={close}
          maximize={maximize}
          minimize={minimize}
          fullscreen={fullscreen}
          download={download}
          onMouseEnter={() => cancelOpt()}
          help={help}
          setHelp={setHelp}
        />
      )}
      {help && (
        <div className={styles.help} onMouseDown={() => setHelp(false)}>
          <ul>
            <li>Next : right click, →</li>
            <li>Previous : left click, ←</li>
            <li>Exit : middle click, ESC</li>
            <li>Zoom in/out : mouse wheel</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Viewer
