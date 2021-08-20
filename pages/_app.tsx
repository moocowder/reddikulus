import "../styles/globals.css"
import type { AppProps } from "next/app"
import Header from "../components/header"
import UserContext from "../contexts/userContext"
import { useEffect, useState } from "react"
import User from "../schema/user"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"))
  }, [])

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}
export default MyApp
