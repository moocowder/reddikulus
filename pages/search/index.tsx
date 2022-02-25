import { GetServerSideProps } from "next"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import Head from "next/head"
import Content from "../../components/content"
import Sublist from "../../components/sublist"
import { BiSearch } from "react-icons/bi"

function Search({ query }: { query: string }) {
  // const [user, setUser] = useContext(UserContext)

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
        <b>{query}</b>
      </div>
      {/* <h1 className="title">Results for "{query}"</h1> */}
      {/* <h2>subreddits</h2> */}
      <Sublist query={query} />
      {/* <h2>posts</h2> */}
      <Content
        api={`search?q=${query}&&sort=SORT&&after=AFTER&limit=16`}
        sorts={{
          words: ["relevance", "hot", "new", "top", "comments"],
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
// https://www.reddit.com/search.json?q=
export default Search
