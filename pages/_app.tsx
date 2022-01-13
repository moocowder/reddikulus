import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import Header from "../components/header"
// import UserContext from "../contexts/userContext"
// import User from "../schema/user"
import "../styles/globals.css"
import { useRouter } from "next/router"
import Menu from "../components/menu"
import { sendEvent, sendVisit } from "../utils/event"

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeStart", (e) => {
      setLoading(true)
      // console.log("ddddd", e)
      // alert("=====>")
      // sendEvent(e)
    })

    router.events.on("routeChangeComplete", (e) => {
      sendEvent(e)

      setLoading(false)
    })
  }, [router])

  return (
    <div>
      {/* <UserContext.Provider value={[user, setUser]}> */}
      {loading && <span className="bar"></span>}
      <Header open={open} setOpen={setOpen} />
      {open && <Menu setOpen={setOpen} />}
      <Component {...pageProps} />
      {/* </UserContext.Provider> */}
    </div>
  )
}

export default MyApp
