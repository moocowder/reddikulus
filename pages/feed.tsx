import { GetServerSideProps } from "next"
import { useEffect, useState, useContext } from "react"
import useLoadFeed from "../hooks/useLoadFeed"
import Masonry from "../components/masonry"
import useToken from "../hooks/useToken"
import Viewer from "../components/viewer"
import Post from "../schema/post"
import Content from "../components/content"
import Head from "next/head"
import UserContext from "../contexts/userContext"

function Feed({ token }: { token: string }) {
  return (
    <div>
      <Head>
        <title>Reddikulus!</title>
      </Head>
      <Content useLoad={useLoadFeed} word={token} />
    </div>
  )
}

function Main() {
  // let [token, setToken] = useState("")
  const [user, setUser] = useContext(UserContext)

  let token = user
  // useEffect(() => {
  //   setToken(localStorage.getItem("access_token") || "")
  // }, [])

  if (!token) return <h3>go back you scum!</h3>
  return <Feed token={token} />
}

export default Main
