import { GetServerSideProps } from "next"
import Head from "next/head"
import Content from "../../components/content"
import Sublist from "../../components/sublist"
import { BiSearch } from "react-icons/bi"

function Search({ query }: { query: string }) {
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "center",
          margin: "50px",
          fontSize: "42px",
        }}
      >
        <BiSearch />
        <b>{query.length < 40 ? query : query.substring(0, 39) + "..."}</b>
      </div>
      <Sublist query={query} />
      <Content
        api={`search?q=${query}&&sort=SORT&&after=AFTER`}
        sorts={{
          words: ["relevance", "hot", "new", "comments", "top"],
          default: "relevance",
        }}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query?.q
  return { props: { query } }
}
export default Search
