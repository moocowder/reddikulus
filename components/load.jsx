import { useEffect, useState } from "react"

function Load() {
  let [loading, setLoading] = useState(false)

  return (
    <h3 style={{ height: "500px", border: "2px solid magenta" }}>Loading...</h3>
  )
}
export default Load
