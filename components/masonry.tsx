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
import Infos from "./Infos"
let n

type Props = {
  posts: Post[]
  onBrickClick: (i: number, t?: string) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
}

function Masonry({ posts, onBrickClick, loadMore, loading, hasMore }: Props) {
  console.log("renderring masonry")
  let rows: number[] = []
  const gap = 30
  let [iw, setIw] = useState(300)
  // const iw = 350

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
    rows[minI] += iw / p.media.ratio + gap
    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  return (
    // style={{ border: "1px solid red", width: "99vw", height: "5440rem" }}
    <div>
      <div className="slidecontainer">
        <p>Zoom in/out :</p>
        <input
          type="range"
          min="200"
          max="800"
          step="50"
          value={iw}
          onChange={(e) => {
            setIw(Number(e.target.value))
          }}
        />
      </div>
      <div
        className={styles.masonry}
        style={{
          marginLeft: (width - (iw + gap) * n + gap) / 2,
          // width: "99vw",
          marginTop: "3rem",
          // border: "1px solid white",
        }}
      >
        {posts?.map((p, i) => (
          <Brick
            key={i}
            post={p}
            width={iw}
            height={iw / p.media.ratio}
            position={getPos(p)}
            lastElementRef={i === posts.length - 1 ? lastElementRef : null}
            onClick={(t?: string) => onBrickClick(i, t)}
          />
        ))}
      </div>
    </div>
  )
}
export default Masonry
