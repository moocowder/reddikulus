import styles from "../styles/brick.module.css"
import { useState } from "react"
import { Post, Image, Video, Gallery, Gif } from "../schema/post"
import Imagine from "./imagine"
import Mirage from "./Mirage"
import Album from "./album"

type Props = {
  post: Post<Image | Video | Gallery | Gif>
  setInfos: Function
  position: { top: number; left: number }
  width: number
  height: number
  onClick: Function
  lastBrick: Function | null
}

function Brick({
  post,
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
        ref={rendered}
        style={{
          width,
          height,
          top: position.top,
          left: position.left,
          // border: post.media.nsfw ? "3px solid red" : "",
        }}
        onMouseEnter={() => setInfos(post.infos)}
        onMouseLeave={(e) => setInfos(null)}
        onClick={() => onClick()}
      >
        <span style={{ position: "absolute", margin: "5px", color: "grey" }}>
          {post.infos.title}
        </span>
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
