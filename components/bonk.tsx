import { useRouter } from "next/router"

function Bonk() {
  const router = useRouter()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: "1px solid red",
        // height: "100vh",
        fontSize: "32px",
        gap: "20px",
      }}
    >
      <p>this is a +18 community</p>
      <img src="/bonk.webp" alt="" />
      <p>
        <span
          style={{ color: "#ff0066", cursor: "pointer" }}
          onClick={() => router.back()}
        >
          get back
        </span>
        &nbsp;or go to horny jail!&nbsp;
        <span style={{ color: "#ff0066" }}>
          ≽(
          <span style={{ color: "rgb(255, 181, 249)" }}> ò_ó </span>
          )≼
        </span>
      </p>
    </div>
  )
}
export default Bonk
