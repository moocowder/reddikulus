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
import Badge from "../../components/badge"

type Sub = {
  display_name: string
  header_img: string
  icon_img: string
  community_icon: string
  // public_description: string
  primary_color: string
  key_color: string
  subscribers: number
  banner_background_color: string
}

function Search({ query }: { query: string }) {
  const [user, setUser] = useContext(UserContext)
  const [subs, setSubs] = useState<Sub[]>([])

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://www.reddit.com/subreddits/search.json`,
      params: { q: query, include_over_18: "on", limit: 8 },
    })
      .then((r) => {
        let poo = r.data.data.children.map((c: any) => {
          return {
            display_name: c.data.display_name,
            // header_img: string,
            icon_img: c.data.icon_img,
            community_icon: c.data.community_icon.replace(/\?.*/, ""),
            // public_description: string
            subscribers: c.data.subscribers,
            primary_color: c.data.primary_color,
            key_color: c.data.key_color,
            banner_background_color: c.data.banner_background_color,
          }
        })
        console.log(poo)
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
          <li>
            <img
              style={{ width: "40px" }}
              src={s.community_icon || s.icon_img}
              alt=""
            />
            {!s.community_icon && !s.icon_img && (
              <Badge
                side={80}
                color={
                  s.primary_color || s.key_color || s.banner_background_color
                }
                text={s.display_name}
              />
            )}
            <b>{s.display_name}</b>
            <p>{s.subscribers}</p>
            <p style={{ backgroundColor: s.key_color }}>key_color</p>
            <p style={{ backgroundColor: s.primary_color }}>primary_color</p>
            <p style={{ backgroundColor: s.banner_background_color }}>
              banner_background_color
            </p>
            <p>--------</p>
          </li>
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
