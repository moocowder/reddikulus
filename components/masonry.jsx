import { useEffect, useState, useRef, useCallback } from "react"
import styles from "../styles/masonry.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import useWindow from "../hooks/useWindow"
import Image from "next/image"
import Cinema from "../components/Cinema"
let n

function Masonry({ posts, handleBrickClick, loadMore, loading, hasMore }) {
  const [title, setTitle] = useState()
  console.log("renderring masonry")
  let rows = []
  let gap = 20
  const iw = 300

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading]
  )

  let { width } = useWindow()
  if (!width) return ""
  n = Math.floor(width / (iw + gap))
  rows = Array(n).fill(0)

  function getPos(p, i) {
    let minI = rows.indexOf(Math.min.apply(null, rows))
    let h = rows[minI]
    rows[minI] += iw / p.data.ratio + gap
    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  function display(p, i) {
    let ref = null
    if (i === posts.length - 1) ref = lastElementRef
    if (p.data.is_video)
      return (
        <Cinema
          src={p.data.media.reddit_video.fallback_url}
          onClick={(t) => {
            handleBrickClick(i, t)
          }}
          ref={ref}
          width={iw}
          height={iw / p.data.ratio}
          style={getPos(p, i)}
        ></Cinema>
      )
    else
      return (
        <img
          className={styles.brick}
          onClick={() => {
            handleBrickClick(i)
          }}
          ref={ref}
          width={iw}
          height={iw / p.data.ratio}
          src={p.data.url}
          style={{
            ...getPos(p, i),
          }}
          alt=""
        />
      )
  }

  function format(number) {
    if (number <= 999) return number
    return (Math.round(number / 100) / 10).toFixed(1) + " k"
  }

  return (
    <div className={styles.masonry}>
      {title ? <div className={styles.title}>{title}</div> : ""}

      {posts?.map((p, i) => (
        <div
          onMouseEnter={() => {
            setTitle(
              <>
                <h3 style={{ display: "inline", color: "cyan" }}>
                  {format(p.data.ups)}
                </h3>
                &nbsp;&nbsp;&nbsp;
                <h2 style={{ display: "inline" }}>{p.data.title}</h2>
              </>
            )
          }}
          onMouseLeave={() => {
            setTitle("")
          }}
        >
          {display(p, i)}
        </div>
      ))}
    </div>
  )
}
export default Masonry
