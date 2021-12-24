import { useEffect, useState, useRef, useContext } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import fs from "fs"
import Content from "../components/content"
import UserContext from "../contexts/userContext"

export default function Home() {
  const [user, setUser] = useContext(UserContext)
  let { access_token, refresh_token } = user

  return (
    <div>
      <Head>
        <title>Reddikulus! | A truly amusing client for Reddit.</title>
      </Head>

      {access_token ? (
        <>
          <h1>Mathi's feed</h1>
          <Content
            api="/api/feed"
            params={{
              access_token,
              refresh_token: refresh_token || "",
            }}
            sorts={{ words: ["best", "new", "top", "rising"], default: "best" }}
          />
        </>
      ) : (
        <>
          <h1 className="title">Popular posts</h1>
          <Content
            api="/api/posts"
            params={{ sub: "popular" }}
            sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
          />
        </>
      )}
    </div>
  )
}
