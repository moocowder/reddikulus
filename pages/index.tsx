import Head from "next/head"
import { GetServerSideProps } from "next"
import Content from "../components/content"
import Alex from "../components/alex"
import { useState } from "react"

function Home({ mobile }: { mobile: boolean }) {
  const [anyway, setAnyway] = useState(false)

  return (
    <>
      <Head>
        <title>Axorsium | A fabulous web client for Reddit.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {mobile && !anyway ? (
        <div style={{ textAlign: "center" }}>
          <Alex face="^_^'" size={22}>
            Axorsium is made for large screen devices. It doesn't run properly
            on mobile devices (yet).
          </Alex>
          <span
            style={{
              background: "#ffffff26",
              padding: "10px",
              borderRadius: "5px",
            }}
            onClick={() => setAnyway(true)}
          >
            continue anyway
          </span>
        </div>
      ) : (
        <Content
          api={`r/popular/SORT?after=AFTER`}
          sorts={{ words: ["hot", "rising", "top"], default: "hot" }}
        />
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers["user-agent"] || ""
  const mobile = /(iPad|iPhone|iPod|Android|Mobile|BlackBerry)/i.test(userAgent)
  return { props: { mobile } }
}

export default Home
