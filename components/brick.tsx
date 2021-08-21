import styles from "../styles/brick.module.css"
import Cinema from "./Cinema"
import Gallery from "./gallery"
import { useState } from "react"
import Infos from "./Infos"
import Post from "../schema/post"
import { LegacyRef } from "react"

type Props = {
  post: Post
  position: { top: number; left: number }
  width: number
  height: number
  lastElementRef: LegacyRef<HTMLDivElement> | null
  onClick: Function
}
function Brick({
  post,
  position,
  width,
  height,
  lastElementRef,
  onClick,
}: Props) {
  let [iw, setIw] = useState(width)
  let [selected, setSelected] = useState(false)
  return (
    <div>
      {selected && (
        <Infos
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
        onMouseEnter={() => {
          setSelected(true)
        }}
        onMouseLeave={() => {
          setSelected(false)
        }}
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
            <Cinema
              src={post.media.url}
              thumbnail={post.thumbnail}
              onClick={(t) => onClick(t)}
            ></Cinema>
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
    </div>
  )
}
export default Brick
