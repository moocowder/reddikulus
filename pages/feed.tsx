import { GetServerSideProps } from "next"
import { useEffect, useState, useContext } from "react"
import useLoadFeed from "../hooks/useLoadFeed"
import Masonry from "../components/masonry"
import useToken from "../hooks/useToken"
import Viewer from "../components/viewer"
import Post from "../schema/post"
import Content from "../components/content"
import Head from "next/head"
import UserContext from "../contexts/userContext"

function Feed({ token }: { token: string }) {
  let [after, setAfter] = useState("")
  const [post, setPost] = useState<Post | null>()
  const [sort, setSort] = useState("hot")

  let { data, loading, error } = useLoadFeed(token, sort, after)

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
      <Head>
        <title>Reddikulus!</title>
      </Head>
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
      {loading && <h1>loading...</h1>}
      {error && <h1>error!</h1>}
    </div>
  )
}

function Main() {
  // let [token, setToken] = useState("")
  const [user, setUser] = useContext(UserContext)

  let token = user
  // useEffect(() => {
  //   setToken(localStorage.getItem("access_token") || "")
  // }, [])

  if (!token) return <h3>go back you scum!</h3>
  return <Feed token={token} />
}

export default Main
