import { GetServerSideProps } from "next"
import { useEffect, useState, useContext } from "react"
import useLoadFeed from "../hooks/useLoadFeed"
import Masonry from "../components/masonry"
import { useRouter } from "next/router"
import UserContext from "../contexts/userContext"
import User from "../schema/user"

function Login({ token }: { token: string }) {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    fetch("https://oauth.reddit.com/api/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((d) => {
        let u: User = {
          token: token,
          name: d.data.name,
          icon: d.data.icon_img.replace(/\?.*/, "") || d.data.snoovatar_img,
          nsfw: d.data.over_18 ? "on" : "off",
        }

        localStorage.setItem("user", JSON.stringify(u))
        setUser(u)
        router.push("/feed")
      })
      .catch((e) => console.log(e))
  }, [])

  return <h3>redirecting...</h3>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let code: string | string[] = context.query?.code || ""
  if (!code || typeof code === "object") return { props: {} }

  let res = await fetch(`https://www.reddit.com/api/v1/access_token`, {
    method: "POST",
    headers: {
      contentType: "application/x-www-form-urlencoded",
      Authorization:
        "Basic dnNrUWxwNDhpNTBGY2dYQWVudkhiQTpLLU9MRXJPWkFaRzRWNkM2OEI0cU9FaVltRUxfSlE=",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/login",
    }),
  })
  let d = await res.json()

  return { props: { token: d.access_token } }
}

export default Login
