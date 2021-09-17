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
import axios from "axios"

function Search({ query }: { query: string }) {
  const [user, setUser] = useContext(UserContext)
  const [subs, setSubs] = useState([])

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://www.reddit.com/subreddits/search.json`,
      params: { q: query, include_over_18: "on", limit: 8 },
    })
      .then((r) => {
        console.log("00000000", r)
        let poo = r.data.data.children.map((c: any) => c.data.display_name)
        setSubs(poo)
      })
      .catch((e) => {
        console.log("erreur : ", e)
      })
  }, [query])

  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      <ul>
        {subs.map((s) => (
          <li>{s}</li>
        ))}
      </ul>
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
