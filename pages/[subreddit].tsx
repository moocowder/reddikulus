import { GetServerSideProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import Viewer from "../components/viewer"
import Load from "../components/load"
import { useRouter } from "next/router"
import Masonry from "../components/masonry"

type Data = {
  children: any[]
  after: string
}

function Subreddit({ sub }: any) {
  let [posts, setPosts] = useState([])
  let [after, setAfter] = useState("")
  let [loading, setLoading] = useState(false)
  let [view, setView] = useState(false)
  // let pics = initData?.children?.map((c: any) => c.data.url)

  useEffect(() => {
    loadMore(sub)
  }, [])

  // useEffect(() => {
  //   document.addEventListener("scroll", handleScroll)
  // }, [after])

  // async function handleScroll(e: any) {
  //   console.log("scrolling", after)
  //   let s = e.target.scrollingElement
  //   if (!loading && s.scrollHeight < s.scrollTop + s.clientHeight + 50) {
  //     // setLoading(true)
  //     // let res = await fetch("/api/posts?after=" + after)
  //     // let data = res.json()
  //   }
  // }

  async function loadMore(sub: string, after = "") {
    const res = await fetch(`/api/posts?sub=${sub}&&after=${after}`)
    const data = await res.json()

    data.children = data.children.filter((c: any) => {
      return c.data.is_reddit_media_domain
    })

    data.children = data.children.map((c: any) => {
      let img = c.data.preview.images[0].source
      c.data.ratio = img.width / img.height
      return c
    })
    setAfter(data.after)
    setPosts(posts.concat(data.children))
  }

  // if (view)
  //   return (
  //     <Viewer pics={pics} index={index} setIndex={setIndex} setView={setView} />
  //   )

  return (
    <div>
      <h1>r/{sub}</h1>
      <button
        onClick={() => {
          loadMore(sub, after)
        }}
      >
        next
      </button>
      <Masonry posts={posts} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sub: any = context.params?.subreddit
  return { props: { sub } }
}

export default Subreddit
