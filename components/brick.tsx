import styles from "../styles/brick.module.css"
import Cinema from "./Cinema"
import Gallery from "./gallery"
import { useState } from "react"
import Infos from "./Infos"
import Post from "../schema/post"
import { LegacyRef } from "react"
import Imagine from "./imagine"
import Mirage from "./Mirage"
import Album from "./album"

type Props = {
  post: Post
  position: { top: number; left: number }
  width: number
  height: number
  lastElementRef: LegacyRef<HTMLDivElement> | null
  onClick: Function
  lastBrick: Function
}
function Brick({
  post,
  position,
  width,
  height,
  lastElementRef,
  onClick,
  lastBrick,
}: Props) {
  const [iw, setIw] = useState(width)
  const [selected, setSelected] = useState(false)
  const [visible, setVisible] = useState(false)

  let observer
  function rendered(node) {
    if (observer) observer.disconnect()
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        if (lastBrick) lastBrick()
      }
      // console.log("our node has intersected with viewport", node)
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
          // border: "2px solid green",
          width,
          height,
          top: position.top,
          left: position.left,
        }}
        onMouseEnter={() => {
          setSelected(true)
        }}
        onMouseLeave={() => {
          setSelected(false)
        }}
        // ref={lastElementRef}
        ref={rendered}
        onClick={() => onClick()}
      >
        {post.media.type === "image"
          ? // <img
            //   className={styles.media}
            //   src={post.media.thumbnail}
            //   onClick={() => onClick()}
            // />
            // <div className={styles.media} onClick={() => onClick()}>

            visible && (
              <Imagine
                thumbnail={post.media.thumbnail}
                original={post.media.url}
              />
            )
          : // <Imagine thumbnail={post.media.thumbnail} original={post.media.url} />
          // </div>
          post.media.type === "video"
          ? // <div>
            /* <Cinema
              src={post.media.peek}
              thumbnail={post.media.thumbnail}
              poster={post.media.poster}
              onClick={(t) => onClick(t)}
            ></Cinema> */
            visible && (
              <Mirage
                thumbnail={post.media.thumbnail}
                poster={post.media.poster || ""}
                peek={post.media.peek || ""}
                // url={post.media.url || ""}
                duration={post.media.duration}
              />
            )
          : // </div>
            // <Gallery
            //   style={{
            //     width: "inherit",
            //     height: "inherit",
            //     borderRadius: "3px",
            //     border: "2px solid yellow",
            //   }}
            //   onClick={() => onClick()}
            //   urls={post.media.urls}
            //   thumbnails={post.media.thumbnails}
            // />
            visible && <Album thumbnails={post.media.thumbnails} />}
      </div>
    </div>
  )
}
export default Brick
