import { useEffect } from "react"
import { useState } from "react"

type Keys = {
  audio: string | null
  video: string[]
}

function showResult(xml: any, path: string): string[] {
  let keys: string[] = []
  if (xml.evaluate) {
    var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)
    var result = nodes.iterateNext()
    while (result) {
      keys.push(result.childNodes[0].nodeValue)
      result = nodes.iterateNext()
    }
  }
  return keys

  // Code For Internet Explorer
  // else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
  //     xml.setProperty("SelectionLanguage", "XPath");
  //     nodes = xml.selectNodes(path);
  //     for (i = 0; i < nodes.length; i++) {
  //         txt += nodes[i].childNodes[0].nodeValue + "<br>";
  //     }
  // }
  // document.getElementById("demo").innerHTML = txt;
}

function useLoadKeys(dash: string) {
  const [keys, setKeys] = useState<Keys>({ audio: null, video: [] })
  useEffect(() => {
    if (!dash) return
    fetch(dash)
      .then((r) => r.text())
      .then((str) => {
        const xml = new window.DOMParser().parseFromString(
          str.replace(/xmlns=".*"/, ""),
          "text/xml"
        )

        let audioKey = showResult(
          xml,
          "/MPD//AdaptationSet[@contentType='audio']//BaseURL"
        )
        let videoKeys = showResult(
          xml,
          "/MPD//AdaptationSet[@contentType='video']//BaseURL"
        )

        if (videoKeys.length === 0) videoKeys.push("none")
        setKeys({ audio: audioKey[0] || null, video: videoKeys })
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {})
  }, [dash])

  // console.log(keys)
  // alert(keys.video)
  return keys
}
export default useLoadKeys
