import {
  useEffect,
  useState,
  useRef,
  useCallback,
  HTMLAttributeReferrerPolicy,
} from "react"
import styles from "../styles/masonry.module.css"
// import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import useWindow from "../hooks/useWindow"
import Image from "next/image"
import Cinema from "./Cinema"
import Post from "../schema/post"
import Brick from "../components/brick"
let n

type Props = {
  posts: Post[]
  onBrickClick: (i: number, t?: string) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
}

function Masonry({ posts, onBrickClick, loadMore, loading, hasMore }: Props) {
  const [title, setTitle] = useState("")
  console.log("renderring masonry")
  let rows: number[] = []
  const gap = 20
  const iw = 300

  const observer = useRef<IntersectionObserver>()
  const lastElementRef = (node: Element) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    })
    if (node) observer.current.observe(node)
  }

  let { width } = useWindow()
  if (!width) return null

  n = Math.floor(width / (iw + gap))

  rows = Array(n).fill(0)

  function getPos(p: Post) {
    let minI = rows.indexOf(Math.min.apply(null, rows))
    let h = rows[minI]
    rows[minI] += iw / p.ratio + gap
    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  function format(number: number) {
    if (number <= 999) return number
    return (Math.round(number / 100) / 10).toFixed(1) + " k"
  }

  return (
    <div className={styles.masonry}>
      {title ? <div className={styles.title}>{title}</div> : null}

      {posts?.map((p, i) => (
        <Brick
          post={p}
          width={iw}
          height={iw / p.ratio}
          position={getPos(p)}
          lastElementRef={i === posts.length - 1 ? lastElementRef : null}
          onMouseEnter={() => setTitle(p.title)}
          onMouseLeave={() => setTitle("")}
          onClick={() => onBrickClick(i)}
        />
      ))}
    </div>
  )
}
export default Masonry
