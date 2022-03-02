import Head from "next/head"
import { GetServerSideProps } from "next"
import Content from "../components/content"
import Alex from "../components/alex"

function Home({ mobile }: { mobile: boolean }) {
  return (
    <>
      <Head>
        <title>Reddikulus | A truly amusing client for Reddit.</title>
      </Head>

      {mobile ? (
        <Alex face="0_0" size={22}>
          Reddikulus is made for large screen devices. It doesn't run properly
          on mobile devices (yet).
        </Alex>
      ) : (
        <Content
          api={`r/popular/SORT?after=AFTER`}
          sorts={{ words: ["hot", "top", "rising"], default: "hot" }}
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
