import Alex from "../components/alex"
import Xolo from "../components/xolo"
import { useRouter } from "next/router"
import Head from "next/head"

function NotFound() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>404 | Not Found</title>
      </Head>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontSize: "62px" }}>404</h1>
        <Alex face={"ට_ට"}>
          <h3> couldn't find this page.&nbsp;</h3>
          <small
            style={{
              color: "#ff0066",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            go back
          </small>
        </Alex>
      </div>
    </>
  )
}

export default NotFound
