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
  let [view, setView] = useState(false)
  let [hover, setHover] = useState(false)
  let [index, setIndex] = useState()

  let { data, loading, error } = useLoadMore("r/" + sub, after)

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.after) {
          setAfter(data.after)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading]
  )

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
      {hover ? (
        <h2 className={styles.title}>{data.posts[index].data.title}</h2>
      ) : (
        ""
      )}
      {view ? (
        <Viewer
          posts={data.posts}
          index={index}
          setIndex={setIndex}
          setView={setView}
        />
      ) : (
        ""
      )}
      <Masonry
        posts={data.posts}
        lastElementRef={lastElementRef}
        setIndex={setIndex}
        setView={setView}
        setHover={setHover}
      />
      {loading && <h1>loading...</h1>}
      {error && <h1>error!</h1>}
      {/* <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {posts?.map((p: any, index: any) => {
          // if (c.kind !== "t3") return
          return (
            <div key={Math.random()}>
              <a href={"https://reddit.com" + p.data.permalink}>go</a>
              <div
                onClick={() => {
                  setIndex(index)
                  setView(true)
                }}
              >
                {p.data.is_video ? (
                  <video
                    style={{
                      width: "300px",
                      border: "2px solid green",
                      borderRadius: "5px",
                    }}
                    controls
                  >
                    <source
                      src={p.data.media.reddit_video.fallback_url}
                    ></source>
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <img
                    style={{
                      width: "300px",
                      border: "2px solid green",
                      borderRadius: "5px",
                    }}
                    src={p.data.url}
                    alt=""
                  />
                )}
              </div>
              <br />
            </div>
          )
        })}
      </ul> */}
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
