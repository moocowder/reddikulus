import { useState } from "react"
import Post from "../schema/post"
import Masonry from "./masonry"
import Viewer from "./viewer"
import Data from "../schema/data"

function Content({
  useLoad,
  word,
}: // word
{
  useLoad: Function
  word: string
}) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState("hot")
  const [post, setPost] = useState<Post | null>()

  let { data, loading, error } = useLoad(word, sort, after)

  let move = {
    next: () => {
      if (!post) return
      let i = data.posts.indexOf(post)

      if (i === data.posts.length - 2) {
        setAfter(data.after)
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
      <button onClick={() => setSort("hot")}>hot</button>
      <button onClick={() => setSort("new")}>new</button>
      <button onClick={() => setSort("top")}>top</button>
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
      {!data.after && !loading && (
        <h1
          style={{ zIndex: 4, position: "fixed", bottom: "10px", left: "3px" }}
        >
          ===========================
        </h1>
      )}
      {loading && <h1>loading...</h1>}
      {error && <h1>error!</h1>}
    </div>
  )
}

export default Content
