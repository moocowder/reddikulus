import { GetServerSideProps } from "next"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import Head from "next/head"
import Content from "../../components/content"
import UserContext from "../../contexts/userContext"
import Sublist from "../../components/sublist"

function Search({ query }: { query: string }) {
  const [user, setUser] = useContext(UserContext)

  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      <Sublist query={query} />
      <Content
        api="/api/search"
        params={{ q: query, sort: "best", nsfw: user.nsfw || "" }}
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
