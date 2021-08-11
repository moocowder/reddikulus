import "../styles/globals.css"
import type { AppProps } from "next/app"
import Header from "../components/header"
import UserContext from "../contexts/userContext"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setuser] = useState("")
  useEffect(() => {
    setuser(localStorage.getItem("access_token") || "")
  }, [])

  return (
    <div>
      <UserContext.Provider value={[user, setuser]}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}
export default MyApp
