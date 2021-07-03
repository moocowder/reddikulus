import { useEffect, useState } from "react"
import styles from "../styles/masonry.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import useWindow from "../hooks/useWindow"
let n

function Masonry({ posts, lastElementRef }) {
  let rows = []
  let gap = 20
  const iw = 300
  let { width } = useWindow()
  if (!width) return ""
  n = Math.floor(width / iw)
  rows = Array(n).fill(0)

  function getPos(p, i) {
    let minI = rows.indexOf(Math.min.apply(null, rows))
    let h = rows[minI]
    rows[minI] += iw / p.data.ratio + gap
    return {
      left: minI * iw + gap * minI + (width - (iw * 4 + gap * 3)) / 2,
      top: h,
    }
  }

  return (
    <div className={styles.masonry} style={{}}>
      {posts?.map(
        (p, i) =>
          posts.length === i + 1 ? (
            <img
              ref={lastElementRef}
              width={iw}
              height={iw / p.data.ratio}
              // effet="blur"
              src={p.data.url}
              style={{
                borderRadius: "3px",
                position: "absolute",
                ...getPos(p, i),
              }}
              alt=""
            />
          ) : (
            <img
              width={iw}
              height={iw / p.data.ratio}
              // effet="blur"
              src={p.data.url}
              style={{
                borderRadius: "3px",
                position: "absolute",
                ...getPos(p, i),
              }}
              alt=""
            />
          )

        // <LazyLoadImage
        //   width={iw}
        //   height={iw / p.data.ratio}
        //   effet="blur"
        //   src={p.data.url}
        //   style={{
        //     position: "absolute",
        //     ...getPos(p),
        //   }}
        //   alt=""
        // />
      )}
    </div>
  )
}
export default Masonry
