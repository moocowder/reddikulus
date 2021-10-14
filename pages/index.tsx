import { useEffect, useState, useRef, useContext } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import fs from "fs"
import Content from "../components/content"
import UserContext from "../contexts/userContext"

export default function Home() {
  const [user, setUser] = useContext(UserContext)
  let token = user.token

  return (
    <div>
      <Head>
        <title>Reddikulus! | A truly amusing client for Reddit.</title>
      </Head>

      {token ? (
        <Content
          api="/api/feed"
          params={{ token, sort: "best" }}
          sorts={["best", "new", "top", "rising"]}
        />
      ) : (
        <Content
          api="/api/posts"
          params={{ sub: "popular", sort: "hot" }}
          sorts={["hot", "new", "top", "rising"]}
        />
      )}
    </div>
  )
}
