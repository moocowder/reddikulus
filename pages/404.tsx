import Alex from "../components/alex"
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
          couldn't find this page.&nbsp;
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
