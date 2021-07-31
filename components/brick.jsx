import styles from "../styles/brick.module.css"
import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import { useState } from "react"

function Brick({
  post,
  position,
  width,
  height,
  lastElementRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  let [iw, setIw] = useState(width)
  return (
    <div
      className={styles.brick}
      style={{
        width,
        height,
        top: position.top,
        left: position.left,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={lastElementRef}
    >
      {post.media.type === "image" ? (
        <img
          className={styles.media}
          src={post.media.url}
          onClick={() => onClick()}
        />
      ) : post.media.type === "video" ? (
        <div>
          <Cinema src={post.media.url} onClick={(t) => onClick(t)}></Cinema>
        </div>
      ) : (
        <Gallery
          style={{
            width: "inherit",
            height: "inherit",
            borderRadius: "3px",
            border: "2px solid yellow",
          }}
          onClick={() => onClick()}
          urls={post.media.urls}
        />
      )}
    </div>
  )
}
export default Brick
