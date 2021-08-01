import { GetServerSideProps } from "next"
import { useCallback, useEffect, useRef, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadSearch from "../../hooks/useLoadSearch"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"

function Search({ query }: { query: string }) {
  let [after, setAfter] = useState("")
  const [post, setPost] = useState<Post | null>()
  const [sort, setSort] = useState("hot")

  let { data, loading, error } = useLoadSearch(query, sort, after)

  function handleBrickClick(i: number, t?: string) {
    document.body.style.overflow = "hidden"
    data.posts[i].media.timestamp = t
    setPost(data.posts[i])
  }

  let move = {
    next: () => {
      if (!post) return
      let i = data.posts.indexOf(post)

      if (i === data.posts.length - 2) {
        setAfter(data.after)
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

  return (
    <div>
      <Head>
        <title>{query}</title>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query?.q
  return { props: { query } }
}
// https://www.reddit.com/search.json?q=
export default Search
