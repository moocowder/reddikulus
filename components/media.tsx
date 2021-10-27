import Cinema from "./Cinema"
import Gallery from "./gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"
import Zoom from "./zoom"
import { CgSpinnerTwo } from "react-icons/cg"
import { Gif, Image, Video, Gallery as GalleryType } from "../schema/post"
import { useEffect, useState } from "react"

interface Props {
  media: Gif | Video | Image | GalleryType
  direction: 1 | -1
}

function Media({ media, direction }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [media])

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
          dash={media.dash}
        ></Cinema>
      )}
      {media.type === "image" && (
        <>
          <img src={media.thumbnail} className={styles.background} alt="" />
          <Zoom>
            <Imagine
              thumbnail={media.thumbnail}
              original={media.url}
              appeared={() => setLoading(false)}
            />
          </Zoom>
        </>
      )}
      {media.type === "gallery" && (
        <Gallery urls={media.urls} thumbnails={media.thumbnails} />
      )}
      {media.type === "gif" && (
        <Cinema
          src={media.url}
          thumbnail={media.thumbnail}
          duration={1}
          isGif={true}
        />
      )}

      {loading && <CgSpinnerTwo className={styles.spinner} />}
    </div>
  )
}
export default Media
