import styles from "../styles/brick.module.css"
import { useState } from "react"
import Infos from "./Infos"
import { Post, Image, Video, Gallery } from "../schema/post"
import Imagine from "./imagine"
import Mirage from "./Mirage"
import Album from "./album"

type Props = {
  post: Post<any>
  position: { top: number; left: number }
  width: number
  height: number
  onClick: Function
  lastBrick: Function | null
}

function Brick({ post, position, width, height, onClick, lastBrick }: Props) {
  const [selected, setSelected] = useState(false)
  const [visible, setVisible] = useState(false)

  let observer: IntersectionObserver
  function rendered(node: HTMLDivElement) {
    if (observer) observer.disconnect()
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        if (lastBrick) lastBrick()
      }
    })
    if (node) observer.observe(node)
  }

  return (
    <div>
      {selected && (
        <Infos
          opacity={1}
          ups={post.ups}
          title={post.title}
          permalink={post.permalink}
          sub={post.sub}
          author={post.author}
          comments={post.comments}
          date={post.date}
        />
      )}
      <div
        className={styles.brick}
        style={{
          width,
          height,
          top: position.top,
          left: position.left,
        }}
        onMouseEnter={() => setSelected(true)}
        onMouseLeave={() => setSelected(false)}
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
          <Album thumbnails={post.media.thumbnails} />
        )}
        {/* {post.media.type === "image"
          ? visible && (
              <Imagine
                thumbnail={post.media.thumbnail}
                original={post.media.url}
              />
            )
          : post.media.type === "video"
          ? visible && (
              <Mirage
                thumbnail={post.media.thumbnail}
                poster={post.media.poster || ""}
                peek={post.media.peek || ""}
                // url={post.media.url || ""}
                duration={post.media.duration}
              />
            )
          : visible && <Album thumbnails={post.media.thumbnails} />} */}
      </div>
    </div>
  )
}
export default Brick
