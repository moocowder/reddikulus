import Alex from "../components/alex"
import { useRouter } from "next/router"
import Head from "next/head"

function ServerError() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>500 | Internal Server Error</title>
      </Head>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontSize: "62px" }}>500</h1>
        <Alex face={"x_x"}>
          somthing went wrong. please try again later.
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

export default ServerError
