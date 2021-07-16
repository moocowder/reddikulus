import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadData from "../../hooks/useLoadData"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"

type About = {
  submission_type: string
  banner_img: string
  banner_background_image: string
  mobile_banner_image: string
  header_img: string
  icon_img: string
  community_icon: string
  public_description: string
}

type Props = {
  sub: string
  about: About
}

function Subreddit({ sub, about }: Props) {
  let [after, setAfter] = useState("")
  const [post, setPost] = useState<Post | null>()
  const [sort, setSort] = useState("hot")

  let { data, loading, error } = useLoadData("r/" + sub, sort, after)

  let move = {
    next: () => {
      if (!post) return
      let i = data.posts.indexOf(post)

      if (i === data.posts.length - 1) {
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
    data.posts[i].timestamp = t
    setPost(data.posts[i])
  }

  if (about.submission_type === "self")
    return <h1>This sub doesn't contain any images or videos</h1>

  return (
    <div>
      <Head>
        <title>{sub}</title>
      </Head>
      <p>1. banner_img : {about.banner_img}</p>
      <img src={about.banner_img} />
      <p>2. banner_background_img : {about.banner_background_image}</p>
      <img src={about.banner_background_image.replace(/\?.*/, "")} />
      <p>3. mobile_banner_image : {about.mobile_banner_image}</p>
      <img src={about.mobile_banner_image} />
      <p>4. header_img : {about.header_img}</p>
      <img src={about.header_img} />
      <p>5. icon_img : {about.icon_img}</p>
      <img src={about.icon_img} />
      <p>6. community_icon : {about.community_icon}</p>
      <img src={about.community_icon.replace(/\?.*/, "")} />
      <h1>
        <a href={`https://reddit.com/r/${sub}`}>r/{sub}</a>
      </h1>
      <p>{about.public_description}</p>
      <button onClick={() => setSort("hot")}>hot</button>
      <button onClick={() => setSort("new")}>new</button>
      <button onClick={() => setSort("top")}>top</button>
      {post ? (
        <Viewer
          post={post}
          close={() => setPost(null)}
          isVideo={post.is_video}
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
  let sub = context.params?.subreddit
  let res = await fetch(`https://reddit.com/r/${sub}/about.json`)
  let data = await res.json()

  return { props: { sub, about: data.data } }
}

export default Subreddit
