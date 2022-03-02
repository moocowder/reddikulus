import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import Header from "../components/header"
import "../styles/globals.css"
import { useRouter } from "next/router"
import Menu from "../components/menu"

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // sendVisit()
  }, [])

  useEffect(() => {
    router.events.on("routeChangeStart", (e) => setLoading(true))
    router.events.on("routeChangeComplete", (e) => setLoading(false))
  }, [router])

  return (
    <div>
      {loading && <span className="bar"></span>}
      <Header open={open} setOpen={setOpen} />
      {open && <Menu setOpen={setOpen} />}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
