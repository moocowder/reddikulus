import { useEffect, useState } from "react"

export default function useToken() {
  const [token, setToken] = useState("")

  //   const [loading, setLoading] = useState(false)

  useEffect(() => {
    // setWidth(window.innerWidth)
    setToken(localStorage.getItem("access_token") || "")
  }, [])

  return token
}
