import { useEffect, useState } from "react"
import styles from "../styles/masonry.module.css"
import { Post } from "../schema/post"
import Brick from "../components/brick"
import useWindowSize from "../hooks/useWindowSize"
import { FaArrowUp, FaPlus, FaMinus } from "react-icons/fa"

let n

type Props = {
  posts: Post<any>[]
  onBrickClick: (i: number) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
  setInfos: Function
  children: any
}

function Masonry({
  posts,
  onBrickClick,
  loadMore,
  loading,
  hasMore,
  setInfos,
  children,
}: Props) {
  const { width, height } = useWindowSize()
  const [contentHeight, setContentHeight] = useState(0)

  let rows: number[] = []
  const gap = 30
  let [iw, setIw] = useState(300)

  function lastBrick() {
    setContentHeight(Math.max.apply(null, rows))
    if (loading) return
    if (hasMore) loadMore()
  }

  if (!width) return null

  n = Math.floor(width / (iw + gap))

  rows = Array(n).fill(0)

  function getPos(ratio: number) {
    let minI = rows.indexOf(Math.min.apply(null, rows))

    let h = rows[minI]
    rows[minI] += iw / ratio + gap

    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  return (
    <div>
      {children}
      <div
        className={styles.masonry}
        style={{
          height: contentHeight,
          marginLeft: (width - (iw + gap) * n + gap) / 2,
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        {posts?.map((p, i) => (
          <Brick
            key={i}
            post={p}
            setInfos={setInfos}
            width={iw}
            height={iw / p.media.ratio}
            position={getPos(p.media.ratio)}
            onClick={() => onBrickClick(i)}
            lastBrick={i === posts.length - 1 ? lastBrick : null}
          />
        ))}
      </div>
      <div className={styles.menu}>
        <span
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <FaArrowUp />
        </span>
        <span onClick={() => setIw(iw + 20)}>
          <FaPlus />
        </span>
        <span onClick={() => setIw(iw - 20)}>
          <FaMinus />
        </span>
      </div>
    </div>
  )
}
export default Masonry
