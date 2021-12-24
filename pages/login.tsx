import { GetServerSideProps } from "next"
import { useEffect, useState, useContext } from "react"
import Masonry from "../components/masonry"
import { useRouter } from "next/router"
import UserContext from "../contexts/userContext"
import User from "../schema/user"

function Login({
  access_token,
  refresh_token,
}: {
  access_token: string
  refresh_token: string
}) {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    console.log(access_token)
    fetch("https://oauth.reddit.com/api/me", {
      headers: { Authorization: "Bearer " + access_token },
    })
      .then((r) => r.json())
      .then((d) => {
        let u: User = {
          access_token,
          refresh_token,
          name: d.data.name,
          icon: d.data.icon_img.replace(/\?.*/, "") || d.data.snoovatar_img,
          nsfw: d.data.over_18 ? "on" : "off",
        }

        localStorage.setItem("user", JSON.stringify(u))
        setUser(u)
        // router.push("/")
        window?.opener?.location?.reload()
        window?.close()
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
  console.log("first request returned from server >>>>>>>:", d)
  let res2 = await fetch(`https://www.reddit.com/api/v1/access_token`, {
    method: "POST",
    headers: {
      contentType: "application/x-www-form-urlencoded",
      Authorization:
        "Basic dnNrUWxwNDhpNTBGY2dYQWVudkhiQTpLLU9MRXJPWkFaRzRWNkM2OEI0cU9FaVltRUxfSlE=",
    },
    body: new URLSearchParams({
      // code,
      grant_type: "refresh_token",
      refresh_token: d.refresh_token,
      // redirect_uri: "http://localhost:3000/login",
    }),
  })

  let d2 = await res2.json()
  console.log("second request returned from server >>>>>>>:", d2)
  return {
    props: { access_token: d2.access_token, refresh_token: d.refresh_token },
  }
}

export default Login
