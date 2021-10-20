import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { CgSpinnerTwo } from "react-icons/cg"

function Media({ media, direction }) {
  return (
    <div
      key={media.url}
      className={`${styles.wrapper} ${direction === 1 && styles.right} ${
        direction === -1 && styles.left
      }`}
    >
      {media.type === "video" && (
        <Cinema
          src={media.url}
          thumbnail={media.thumbnail}
          duration={media.duration}
          // id="image"
          // timestamp={media.timestamp || 0}
          // autoplay={true}
        ></Cinema>
      )}
      {media.type === "image" && (
        <>
          <img src={media.thumbnail} className={styles.background} alt="" />
          <Zoom>
            <Imagine thumbnail={media.thumbnail} original={media.url} />
          </Zoom>
        </>
      )}
      {media.type === "gallery" && (
        <Gallery
          urls={media.urls}
          thumbnails={media.thumbnails}
          fullscreen={true}
        />
      )}
      {media.type === "gif" && (
        <Cinema src={media.url} thumbnail={media.thumbnail} duration={1} />
      )}

      <CgSpinnerTwo className={styles.spinner} />
    </div>
  )
}
export default Media
