import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import Header from "../components/header"
import UserContext from "../contexts/userContext"
import User from "../schema/user"
import Panel from "../components/panel"
import "../styles/globals.css"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({})
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"))
  }, [])

  // useEffect(() => {
  //   router.events.on("routeChangeStart", () => alert("start"))
  //   router.events.on("routeChangeComplete", () => alert("end"))
  //   // router.events.on("routeChangeError", handleStop)
  // }, [router])
  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        {/* <span className="bar">hello</span> */}
        <Header open={open} setOpen={setOpen} />
        {open && <Panel setOpen={setOpen} />}
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}

export default MyApp
