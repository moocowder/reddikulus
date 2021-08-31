import { useState } from "react"
import Post from "../schema/post"
import Masonry from "./masonry"
import Viewer from "./viewer"
import Data from "../schema/data"
import useLoadData from "../hooks/useLoadData"
import Sort from "./Sort"
import Word from "../schema/sorts"

function Content({
  api,
  params,
}: {
  api: string
  params: { [key: string]: string }
}) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState<Word>(params.sort)
  const [post, setPost] = useState<Post | null>()

  // console.log("++++++++++++++++++")
  // console.log("after :", after, "sort :", sort, "post :", post)
  // console.log("params :", params)
  // console.log("__________________")
  let { data, loading, error } = useLoadData(api, { ...params, sort, after })

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

  function handleBrickClick(i: number, t?: string) {
    document.body.style.overflow = "hidden"
    data.posts[i].media.timestamp = t
    setPost(data.posts[i])
  }

  return (
    <div>
      <Sort
        words={["best", "hot", "new", "top"]}
        sort={sort}
        setSort={setSort}
      />
      {post ? (
        <Viewer
          post={post}
          close={() => setPost(null)}
          isVideo={post.media.type === "video"}
          move={move}
        />
      ) : null}
      <Masonry
        posts={data.posts}
        onBrickClick={handleBrickClick}
        loadMore={() => setAfter(data.after)}
        loading={loading}
        hasMore={data.after}
      />
      {loading && (
        <h1
          style={{ zIndex: 4, position: "fixed", bottom: "30px", left: "3px" }}
        >
          loading...
        </h1>
      )}
      {error && <h1>error!</h1>}
    </div>
  )
}

export default Content
