import { GetServerSideProps } from "next"
import { useCallback, useEffect, useRef, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadSearch from "../../hooks/useLoadSearch"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"
import Content from "../../components/content"

function Search({ query }: { query: string }) {
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      <Content useLoad={useLoadSearch} word={query} sortInit="relevence" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query = context.query?.q
  return { props: { query } }
}
// https://www.reddit.com/search.json?q=
export default Search
