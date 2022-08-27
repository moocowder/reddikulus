import Content from "../../components/content"
import Head from "next/head"

function Popular() {
  return (
    <>
      <Head>
        <title>r/popular</title>
      </Head>
      <Content
        api={`r/popular/SORT?after=AFTER`}
        sorts={{ words: ["hot", "new", "rising", "top"], default: "hot" }}
      />
    </>
  )
}
export default Popular
