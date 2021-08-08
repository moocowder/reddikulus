import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadUser from "../../hooks/useLoadUser"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"

type About = {
  title: string
  // name: string
  description: string
  public_description: string
  icon_img: string
  snoovatar_img: string
  banner_img: string
}

type Props = {
  user: string
  about: About
}

function User({ user, about }: Props) {
  let [after, setAfter] = useState("")
  const [post, setPost] = useState<Post | null>()
  const [sort, setSort] = useState("new")

  let { data, loading, error } = useLoadUser("u/" + user, sort, after)

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
        <title>{user}</title>
      </Head>

      <div className={styles.wrapper}>
        <img
          className={styles.banner}
          src={about.banner_img?.replace(/\?.*/, "")}
          alt=""
        />
      </div>
      <img
        className={styles.icon}
        src={
          about.icon_img?.replace(/\?.*/, "") ||
          about.snoovatar_img?.replace(/\?.*/, "")
        }
        alt=""
      />

      <br />
      <br />
      <h1>
        <a href={`https://reddit.com/u/${user}`}>u/{user}</a>
      </h1>
      <h1>{about.title}</h1>
      <p>{about.description}</p>
      <p>{about.public_description}</p>
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
  let user = context.params?.user
  let res = await fetch(`https://reddit.com/u/${user}/about.json`)
  let data = await res.json()

  let about = {
    title: data.data.subreddit.title,
    // name: data.data.name,
    description: data.data.subreddit.description,
    public_description: data.data.subreddit.public_description,
    icon_img: data.data.icon_img,
    snoovatar_img: data.data.snoovatar_img,
    banner_img: data.data.subreddit.banner_img,
  }
  return { props: { user, about } }
}

export default User
