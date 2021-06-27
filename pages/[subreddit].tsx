import { GetServerSideProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import Viewer from "../components/viewer"
function Subreddit({ data, sub, page }: any) {
  let [view, setView] = useState(false)
  let [index, setIndex] = useState(0)
  let pics = data.children.map((c: any) => c.data.url)

  if (view)
    return (
      <Viewer pics={pics} index={index} setIndex={setIndex} setView={setView} />
    )

  return (
    <div>
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
      <h1>r/{sub}</h1>
      <ul
        style={{
          columns: "4",
        }}
      >
        {data.children.map((c: any, index: any) => {
          // if (c.kind !== "t3") return

          return (
            <div
              onClick={() => {
                setIndex(index)
                setView(true)
              }}
            >
              {c.data.is_video ? (
                <video
                  style={{
                    width: "300px",
                    border: "2px solid green",
                    borderRadius: "5px",
                  }}
                  controls
                >
                  <source src={c.data.media.reddit_video.fallback_url}></source>
                  Your browser does not support HTML video.
                </video>
              ) : (
                <img
                  style={{
                    width: "300px",
                    border: "2px solid green",
                    borderRadius: "5px",
                  }}
                  src={c.data.url}
                  alt=""
                />
              )}
            </div>
          )
        })}
      </ul>
      <Link href={`/${sub}?page=${Number(page) + 1}`}>
        <button>next</button>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sub = context.params?.subreddit
  let page = context.query?.page || 1

  const res = await fetch(`https://reddit.com/r/${sub}.json`)
  const data = await res.json()

  return { props: { data: data.data, sub, page } }
}

export default Subreddit
