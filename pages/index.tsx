import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import styles from "../styles/Home.module.css"
import useLoadData from "../hooks/useLoadData"
import Masonry from "../components/masonry"
import Viewer from "../components/viewer"
import Post from "../schema/post"
import { GetServerSideProps } from "next"
import fs from "fs"
import Topic from "../schema/topic"
import Topics from "../components/topics"
import Header from "../components/header"

type Sub = {
  name: string
  subscribers: string
  title: string
  isNSFW: boolean
  icon: string
  banner?: string
}

export default function Home({ allSubs }: { allSubs: Sub[] }) {
  let [after, setAfter] = useState("")
  const [sort, setSort] = useState("hot")
  const [post, setPost] = useState<Post | null>()

  let { data, loading, error } = useLoadData("r/" + "popular", sort, after)

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
        <title>Reddikulus! | Search for communities</title>
      </Head>
      <div className={styles.header}>
        <Header />
      </div>

      <ul>
        {allSubs.map((s: Sub) => (
          <li style={{ color: "pink" }}>
            <Link href={`/r/${s.name}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
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

export const getServerSideProps: GetServerSideProps = async () => {
  // let topics: Topic[] = JSON.parse(fs.readFileSync("data.json", "utf8"))
  let allSubs = JSON.parse(fs.readFileSync("all.json", "utf8"))

  return { props: { allSubs } }
}
