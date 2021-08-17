import styles from "../styles/brick.module.css"
import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import { useState } from "react"
import Infos from "./Infos"

function Brick({ post, position, width, height, lastElementRef, onClick }) {
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
        <p className={styles.sub}>{post.sub}</p>
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
