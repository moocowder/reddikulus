import styles from "../styles/brick.module.css"
import { useEffect, useState } from "react"
import Infos from "./Infos"
import { Post, Image, Video, Gallery, Gif } from "../schema/post"
import Imagine from "./imagine"
import Mirage from "./Mirage"
import Album from "./album"

type Props = {
  post: Post<Image | Video | Gallery | Gif>
  // setSelected: Function
  setInfos: Function
  position: { top: number; left: number }
  width: number
  height: number
  onClick: Function
  lastBrick: Function | null
}

function Brick({
  post,
  // setSelected,
  setInfos,
  position,
  width,
  height,
  onClick,
  lastBrick,
}: Props) {
  const [visible, setVisible] = useState(false)

  let observer: IntersectionObserver
  function rendered(node: HTMLDivElement) {
    if (observer) observer.disconnect()
    observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          if (lastBrick) lastBrick()
        } else {
          // setVisible(false)
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
        onMouseEnter={() => setInfos(post.infos)}
        onMouseLeave={(e) => setInfos(null)}
        ref={rendered}
        onClick={() => onClick()}
      >
        {post.media.type === "image" && visible && (
          <Imagine thumbnail={post.media.thumbnail} original={post.media.url} />
        )}
        {post.media.type === "video" && visible && (
          <Mirage
            thumbnail={post.media.thumbnail}
            poster={post.media.poster}
            peek={post.media.peek}
            duration={post.media.duration}
          />
        )}
        {post.media.type === "gallery" && visible && (
          <Album
            thumbnails={post.media.thumbnails}
            originals={post.media.urls}
          />
        )}
        {post.media.type === "gif" && visible && (
          <Mirage
            thumbnail={post.media.thumbnail}
            poster={post.media.poster}
            peek={post.media.peek}
          />
        )}
      </div>
    </div>
  )
}
export default Brick
