import { useEffect, useState } from "react"
import { Post } from "../schema/post"
import Masonry from "./masonry"
import Viewer from "./viewer"
import useLoadData from "../hooks/useLoadData"
import Sort from "./Sort"
import Word from "../schema/sorts"
import styles from "../styles/content.module.css"

function Content({
  api,
  params,
  sorts,
}: {
  api: string
  params: { [key: string]: string }
  sorts: Word[]
}) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState<string>(params.sort)
  const [post, setPost] = useState<Post<any> | null>()

  let { data, loading, error } = useLoadData(api, { ...params, sort, after })

  useEffect(() => {
    if (data.posts?.length === 0)
      setTimeout(() => {
        setAfter(data.after)
      }, 1000)
  }, [data])

  // useEffect(() => {
  //   console.log("000000000000000000000")
  //   setAfter("")
  // }, [params.sub, params.user, params.q, params.sort])

  // useEffect(() => {
  //   if (data.after === "") {
  //     console.log("@@@@@@@@@@@@@@@@@@@@")

  //     setAfter("")
  //   }
  // }, [data])

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
    <div>
      <Sort words={sorts} sort={sort} setSort={setSort} />
      {post && <Viewer post={post} close={() => setPost(null)} move={move} />}
      <Masonry
        posts={data.posts}
        onBrickClick={handleBrickClick}
        loadMore={() => setAfter(data.after)}
        loading={loading}
        hasMore={data.after}
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
