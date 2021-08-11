import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import useLoadFeed from "../hooks/useLoadFeed"
import Masonry from "../components/masonry"
import { useRouter } from "next/router"

function Login({ token }: { token: string }) {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("access_token", token)
    router.push("/feed")
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
