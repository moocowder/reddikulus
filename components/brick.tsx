import styles from "../styles/brick.module.css"
import { useEffect, useState } from "react"
import Infos from "./Infos"
import { Post, Image, Video, Gallery } from "../schema/post"
import Imagine from "./imagine"
import Mirage from "./Mirage"
import Album from "./album"

type Props = {
  post: Post<any>
  setSelected: Function
  position: { top: number; left: number }
  width: number
  height: number
  onClick: Function
  lastBrick: Function | null
}

function Brick({
  post,
  setSelected,
  position,
  width,
  height,
  onClick,
  lastBrick,
}: Props) {
  const [visible, setVisible] = useState(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     alert("red light")
  //     setVisible(false)
  //   }, 10000)
  // }, [])
  let observer: IntersectionObserver
  function rendered(node: HTMLDivElement) {
    if (observer) observer.disconnect()
    observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          if (lastBrick) lastBrick()
        } else {
          setVisible(false)
        }
      },
      { threshold: 0 }
    )
    if (node) observer.observe(node)
  }

  return (
    <div>
      <div
        className={`${styles.brick} `}
        style={{
          width,
          height,
          top: position.top,
          left: position.left,
          // animation: "loading 3s linear infinite",
        }}
        // onMouseEnter={() => setSelected(true)}
        onMouseEnter={() => setSelected(post)}
        // onMouseLeave={() => setSelected(false)}
        onMouseLeave={() => setSelected(null)}
        ref={rendered}
        onClick={() => onClick()}
      >
        {post.media.type === "image" && visible && (
          <Imagine thumbnail={post.media.thumbnail} original={post.media.url} />
        )}
        {post.media.type === "video" && visible && (
          <Mirage
            thumbnail={post.media.thumbnail}
            poster={post.media.poster || ""}
            peek={post.media.peek || ""}
            duration={post.media.duration}
          />
        )}
        {post.media.type === "gallery" && visible && (
          <Album
            thumbnails={post.media.thumbnails}
            originals={post.media.urls}
          />
        )}
      </div>
    </div>
  )
}
export default Brick
