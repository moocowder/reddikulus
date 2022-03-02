import { useRouter } from "next/router"
import Alex from "./alex"

function Bonk() {
  const router = useRouter()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        fontSize: "32px",
        gap: "20px",
      }}
    >
      <h3>this is a +18 community</h3>

      <img src="/bonk.webp" alt="" />

      <Alex face="ò_ó">
        <span
          style={{ color: "#ff0066", cursor: "pointer" }}
          onClick={() => router.back()}
        >
          get back
        </span>
        &nbsp;or go to horny jail!&nbsp;
      </Alex>
    </div>
  )
}
export default Bonk
