import { GetServerSideProps } from "next"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Viewer from "../components/viewer"
import Load from "../components/load"
import { useRouter } from "next/router"
import Masonry from "../components/masonry"
import useLoadMore from "../hooks/useLoadMore"
import { useCallback } from "react"

function Subreddit({ sub }) {
  let [after, setAfter] = useState("")
  // let [view, setView] = useState(false)
  // let pics = initData?.children?.map((c: any) => c.data.url)

  // let last = useRef("")
  let { data, loading, error } = useLoadMore(sub, after)

  useEffect(() => {
    console.log("i got called from subreddit")
  }, [])

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.after) {
          console.log("this one", entries)
          setAfter(data.after)
        }
      })
      console.log(node)
      if (node) observer.current.observe(node)
    },
    [loading]
  )

  // if (view)
  //   return (
  //     <Viewer pics={pics} index={index} setIndex={setIndex} setView={setView} />
  //   )

  return (
    <div>
      <h1>r/{sub}</h1>
      <Masonry
        posts={data.posts}
        loading={loading}
        lastElementRef={lastElementRef}
      />
      {/* <ul>
        {data?.posts?.map((p: any) => (
          <img src={p.data.url} alt="" style={{ width: "200px" }} />
        ))}
      </ul> */}

      {error && <h1>error!</h1>}

      {/* {view ? (
        <Viewer
          pics={pics}
          index={index}
          setIndex={setIndex}
          setView={setView}
        />
      ) : (
        ""
      )} */}
      {/* <h1>r/{sub}</h1> */}
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
  return { props: { sub } }
}

export default Subreddit
