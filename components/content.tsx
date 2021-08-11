import { useState } from "react"
import Post from "../schema/post"
import Masonry from "./masonry"
import Viewer from "./viewer"

function Content({
  useLoad,
}: // word
{
  useLoad: () => { data: any; loading: boolean; error: boolean }
}) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState("hot")
  const [post, setPost] = useState<Post | null>()

  // let { data, loading, error } = useLoad(word,sort, after)
  let { data, loading, error } = useLoad()

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
      {loading && <h1>loading...</h1>}
      {error && <h1>error!</h1>}
    </div>
  )
}

function Boom() {
  return (
    <div>
      <Content
        useLoad={() => {
          return { data: "dd", loading: false, error: false }
        }}
      ></Content>
    </div>
  )
}
export default Content
