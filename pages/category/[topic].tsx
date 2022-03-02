import { GetServerSideProps } from "next"
import Head from "next/head"
import Content from "../../components/content"
import Alex from "../../components/alex"

function Topic({ topic, sub }: { topic: string; sub: string }) {
  if (!sub) return <Alex face="o_o">This is not a valid category</Alex>
  return (
    <div>
      <Head>
        <title>Category : {topic}</title>
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "20px",
          margin: "80px auto",
          fontSize: "32px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`/category/${topic}.jpg`}
          width={60}
          height={60}
          style={{ borderRadius: "100%" }}
          alt=""
        />
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

  return { props: { topic, sub: sub || null } }
}

export default Topic
