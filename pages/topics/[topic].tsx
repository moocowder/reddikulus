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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          margin: "80px auto",
          fontSize: "32px",
          textAlign: "center",
          // border: "1px solid white",
          justifyContent: "center",
        }}
      >
        <img
          src="/category/crypto.png"
          width={60}
          height={60}
          style={{ borderRadius: "100%" }}
          alt=""
        />
        <br />
        <b> {topic} </b>
      </div>
      <Content
        api={`r/${sub}/SORT?after=AFTER`}
        sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let topic = context.params?.topic

  let sub = await fetch(
    "https://raw.githubusercontent.com/maathi/topics/master/data.json"
  )
    .then((r) => r.json())
    .then((d) => d.find((t: any) => t.name === topic))
    .then((t) => t.subs.map((s: any) => s.name))
    .then((s) => s.reduce((a: string, v: string) => a + "%2B" + v))
    .catch((e) => console.log(e))

  return { props: { topic, sub } }
}

export default Topic
