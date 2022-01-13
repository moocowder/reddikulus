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
import useEventListener from "../hooks/useEventListener"

interface Props {
  api: string
  params: { [key: string]: string }
  sorts: { words: Word[]; default: Word }
}

function Content({ api, params, sorts }: Props) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState<Word>(sorts.default)
  const [post, setPost] = useState<Post<any> | null>()
  const [infos, setInfos, cancel] = useTimedState<InfosType | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  let { data, loading, error } = useLoadData(api, { ...params, sort, after })

  let ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (data.posts?.length === 0)
      setTimeout(() => {
        setAfter(data.after)
      }, 1000)
  }, [data])

  // useEffect(() => {
  //   alert("ffff " + fullscreen)
  // }, [fullscreen])

  // useEventListener("keydown", (e: any) => {
  //   if (e.key === "Escape") alert("escaping!!")
  // })
  // useEffect(() => {
  //   if (fullscreen) maximize()
  //   if (window.innerHeight === screen.height) minimize()
  // }, [fullscreen])

  // useEffect(() => {
  //   if (post) {
  //     setInfos(post?.infos)
  //     console.log("**********************************************", post?.infos)
  //   }
  // }, [post])

  // useEffect(() => {
  //   alert(infos)
  // }, [infos])
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
    setInfos(data.posts[i].infos)
    setPost(data.posts[i])
  }

  function showInfos(i: InfosType | null) {
    if (post) return
    setInfos(i)
  }

  return (
    <div ref={ref}>
      {infos && (
        <Infos
          infos={infos}
          page={
            params.sub && params.sub !== "popular"
              ? "r/"
              : params.user
              ? "u/"
              : ""
          }
          onMouseEnter={() => cancel()}
          onWheel={() => setInfos(null)}
        />
      )}
      <Sort words={sorts.words} sort={sort} setSort={setSort} />
      {post && (
        <Viewer
          post={post}
          close={() => {
            setPost(null)
            // setFullscreen(false)
            // setInfos(null)
            document.body.style.overflow = "auto"
          }}
          move={move}
          setInfos={setInfos}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        >
          {infos && (
            <Infos
              infos={infos}
              page={
                params.sub && params.sub !== "popular"
                  ? "r/"
                  : params.user
                  ? "u/"
                  : ""
              }
              onMouseEnter={() => cancel()}
              onWheel={() => setInfos(null)}
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
      />
      {loading && <span className={styles.bar}></span>}
      {error && (
        <h1
          style={{ zIndex: 4, position: "fixed", bottom: "30px", left: "3px" }}
        >
          error!
        </h1>
      )}
    </div>
  )
}

export default Content
