import { useEffect, useState } from "react"
import styles from "../styles/masonry.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import useWindow from "../hooks/useWindow"
import Image from "next/image"
import Cinema from "../components/Cinema"
let n

function Masonry({ posts, lastElementRef, setView, setHover, setIndex }) {
  let rows = []
  let gap = 20
  const iw = 300
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
          onMouseEnter={() => {
            setHover(true)
            setIndex(i)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          bonus={() => {
            console.log("yeessss")
            // e.preventDefault()
            setView(true)
            document.body.style.overflow = "hidden"
            setIndex(i)
          }}
          onClick={() => {
            console.log("yeessss")
            // e.preventDefault()
            setView(true)
            document.body.style.overflow = "hidden"
            setIndex(i)
          }}
          ref={ref}
          style={{
            width: iw,
            height: iw / p.data.ratio,
            ...getPos(p, i),
          }}
        ></Cinema>
      )
    else
      return (
        <img
          onMouseEnter={() => {
            setHover(true)
            setIndex(i)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          onClick={() => {
            setView(true)
            document.body.style.overflow = "hidden"
            setIndex(i)
          }}
          ref={ref}
          width={iw}
          height={iw / p.data.ratio}
          src={p.data.url}
          style={{
            borderRadius: "3px",
            position: "absolute",
            ...getPos(p, i),
          }}
          alt=""
        />
      )
  }

  return (
    <div className={styles.masonry}>{posts?.map((p, i) => display(p, i))}</div>
  )
}
export default Masonry
