import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadMore from "../../hooks/useLoadMore"
import styles from "../../styles/subreddit.module.css"
import axios from "axios"

function Subreddit({ sub, about }) {
  let [after, setAfter] = useState("")
  const [post, setPost] = useState()
  const [sort, setSort] = useState("hot")

  let { data, loading, error } = useLoadMore("r/" + sub, sort, after)

  let move = {
    next: () => {
      let i = data.posts.indexOf(post)

      if (i === data.posts.length - 1) {
        setAfter(data.after)
        return
      }
      setPost(data.posts[i + 1])
    },
    prev: () => {
      let i = data.posts.indexOf(post)

      if (i === 0) return
      setPost(data.posts[i - 1])
    },
  }

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
      <button
        onClick={() => {
          setSort("hot")
        }}
      >
        hot
      </button>
      <button
        onClick={() => {
          setSort("new")
        }}
      >
        new
      </button>
      <button
        onClick={() => {
          setSort("top")
        }}
      >
        top
      </button>
      {post ? (
        <Viewer
          post={post}
          close={() => {
            setPost(null)
          }}
          isVideo={post.data.is_video}
          move={move}
        />
      ) : (
        ""
      )}
      <Masonry
        posts={data.posts}
        handleBrickClick={(i, t) => {
          document.body.style.overflow = "hidden"
          data.posts[i].timestamp = t
          setPost(data.posts[i])
        }}
        loadMore={() => {
          setAfter(data.after)
        }}
        loading={loading}
        hasMore={data.after}
      />
      {loading && <h1>loading...</h1>}
      {error && <h1>error!</h1>}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let sub = context.params?.subreddit
  let res = await fetch(`https://reddit.com/r/${sub}/about.json`)
  let data = await res.json()
  return { props: { sub, about: data.data } }
}

export default Subreddit
