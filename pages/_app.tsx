import "../styles/globals.css"
import type { AppProps } from "next/app"
import Header from "../components/header"
import UserContext from "../contexts/userContext"
import { useEffect, useState } from "react"
import User from "../schema/user"
import Panel from "../components/panel"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"))
  }, [])

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Header setOpen={setOpen} />
        {open && <Panel setOpen={setOpen} />}
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}

export default MyApp
