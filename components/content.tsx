import { useEffect, useRef, useState } from "react"
import { Post } from "../schema/post"
import { Infos as InfosType } from "../schema/post"
import Masonry from "./masonry"
import Viewer from "./viewer"
import useLoadData from "../hooks/useLoadData"
import Sort from "./Sort"
import Word from "../schema/sorts"
import styles from "../styles/content.module.css"
import Infos from "../components/Infos"
import useTimedState from "../hooks/useTimedState"
import Alex from "./alex"

interface Props {
  api: string
  // params: { [key: string]: string }
  sorts: { words: Word[]; default: Word }
  tag?: string
}

function Content({ api, sorts, tag }: Props) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState<Word>(sorts.default)
  const [post, setPost] = useState<Post<any> | null>()
  const [infos, setInfos, cancel] = useTimedState<InfosType | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  let { data, loading, error } = useLoadData(api, sort, after)

  let ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (data.posts?.length === 0)
      setTimeout(() => {
        setAfter(data.after)
      }, 1000)
  }, [data])

  useEffect(() => {
    setSort(sorts.default)
  }, [api])

  let move = {
    next: () => {
      if (!post) return
      let i = data.posts.indexOf(post)
      if (i === data.posts.length - 1) return
      if (i === data.posts.length - 2) {
        if (data.after) setAfter(data.after)
        setPost(data.posts[i + 1])
        return
      }
      setPost(data.posts[i + 1])
    },
    prev: () => {
      if (!post) return
      let i = data.posts.indexOf(post)

      if (i === 0) return
      setPost(data.posts[i - 1])
    },
  }

  function handleBrickClick(i: number) {
    document.body.style.overflow = "hidden"
    setPost(data.posts[i])
  }

  return (
    <div ref={ref} className={styles.content}>
      <Sort words={sorts.words} sort={sort} setSort={setSort} />
      {post && (
        <Viewer
          post={post}
          close={() => {
            setPost(null)
            setInfos(null)
            document.body.style.overflow = "auto"
          }}
          move={move}
          infos={infos}
          setInfos={setInfos}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        >
          {infos && (
            <Infos
              infos={infos}
              tag={tag}
              onMouseEnter={() => cancel()}
              onWheel={() => setInfos(null)}
              shade={false}
            />
          )}
        </Viewer>
      )}
      <Masonry
        posts={data.posts}
        onBrickClick={handleBrickClick}
        loadMore={() => setAfter(data.after)}
        loading={loading}
        hasMore={data.after}
        setInfos={setInfos}
      >
        {infos && <Infos infos={infos} tag={tag} shade={true} />}
      </Masonry>
      {loading && <span className={styles.bar}></span>}
      {error && (
        <Alex face="x_x">
          something went wrong. &nbsp;
          <span
            style={{ color: "var(--sorbe)", cursor: "pointer" }}
            onClick={() => window.location.reload()}
          >
            refresh?
          </span>
        </Alex>
      )}
      {!error && !loading && data.posts?.length === 0 && !data.after && (
        <Alex face="0_0">There's nothing here</Alex>
      )}
    </div>
  )
}

export default Content
