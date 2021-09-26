import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Content from "../../components/content"
import fs from "fs"

function Topic({ topic, sub }: { topic: string; sub: string }) {
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
        <title>Reddikulus | {topic}</title>
      </Head>
      <Content api="/api/posts" params={{ sub, sort: "best" }} />
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

  return { props: { topic, sub } }
}

export default Topic
