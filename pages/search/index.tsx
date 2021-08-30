import { GetServerSideProps } from "next"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"
import Content from "../../components/content"
import UserContext from "../../contexts/userContext"

function Search({ query }: { query: string }) {
  const [user, setUser] = useContext(UserContext)

  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
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
