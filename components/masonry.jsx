import { useEffect, useState } from "react"
import styles from "../styles/masonry.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

let n

function Masonry({ posts }) {
  let [rows, setRows] = useState([])
  const iw = 300

  useEffect(() => {
    n = Math.floor(window.innerWidth / iw)
    setRows(Array(n).fill(0))
  }, [])

  useEffect(() => {
    setRows(Array(n).fill(0))
  }, [posts])

  function getPos(p) {
    let minI = rows.indexOf(Math.min.apply(null, rows))
    let h = rows[minI]
    rows[minI] += iw / p.data.ratio
    return { left: minI * iw, top: h }
  }

  return (
    <div className={styles.masonry}>
      {posts?.map((p) => {
        return (
          <LazyLoadImage
            width={iw}
            height={iw / p.data.ratio}
            effet="blur"
            src={p.data.url}
            style={{
              position: "absolute",
              ...getPos(p),
            }}
            alt=""
          />
        )
      })}
    </div>
  )
}
export default Masonry
