import { useEffect } from "react"
import { useState } from "react"

function useLoadSound(src: string) {
  const [loading, setLoading] = useState(true)
  const [audioSrc, setAudioSrc] = useState<string | null>("")

  useEffect(() => {
    if (!src) return
    setLoading(true)
    fetch(src.replace(/DASH_\d+/, "DASH_audio"))
      .then((d) => {
        d.status === 200 && setAudioSrc(src.replace(/DASH_\d+/, "DASH_audio"))
      })
      .catch((e) => {
        setAudioSrc(null)
        console.log(e, src, "does NOT have audio")
      })
      .finally(() => setLoading(false))
  }, [src])

  return { loading, src: audioSrc }
}
export default useLoadSound
