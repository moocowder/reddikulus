import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadData from "../../hooks/useLoadData"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"
import Content from "../../components/content"
import fs from "fs"

function Topic({ sub }: { sub: string }) {
  // const [subs, setSubs] = useState<string[]>([])

  // useEffect(() => {
  //   fetch("/api/topics?topic=art and deseign")
  //     .then((r) => r.json())
  //     .then((d) => setSubs(d))
  //     .catch((e) => console.log(e))
  // }, [])
  return (
    <div>
      <Head>
        <title>Reddikulus | Sports</title>
      </Head>

      <Content useLoad={useLoadData} word={sub} sortInit="best" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let topic = context.params?.topic

  let topics = JSON.parse(fs.readFileSync("data.json", "utf8"))
  let sub = topics
    .find((t: any) => t.topic === topic)
    .subs.map((s: any) => s.name)
    .reduce((a: string, v: string) => a + "%2B" + v)

  return { props: { sub } }
}

export default Topic
