import { useState } from "react"
import Xolo from "../components/xolo"
import useEventListener from "../hooks/useEventListener"
import styles from "../styles/donate.module.css"
import { FaCopy } from "react-icons/fa"
import Alex from "../components/alex"

const cryptos = [
  {
    name: "Bitcoin",
    code: "btc",
    address: "bc1q784fcpxkz3hylc2tnhp09edn29uh97jq8hx2l9",
  },
  {
    name: "Ethereum",
    code: "eth",
    address: "0x67C8B44e6f47BAEbDd2236fcE6E84bA2c4A9E1d9",
  },
  {
    name: "Monero",
    code: "xmr",
    address:
      "49LEq8G6YqzFJnLuQfmHPZcnWnbVEWfZQ1K925d1Bvwz7eRZ7Fc2eXnG3NKDu7924TMWxqxcQcdYqT7reWdcTSfD7VCbzjd",
  },
  {
    name: "Litecoin",
    code: "ltc",
    address: "LgcojqSnHpUyT4pNkvedsFSNmorpRNB86m",
  },
  {
    name: "Dash",
    code: "dash",
    address: "XiGtUSHxDViUTkH4FzCceeY7yEQruJoRLq",
  },
  {
    name: "Zcash",
    code: "zec",
    address: "t1fkTwxtLrJrZHUvxNNsoQpSqEuECwxZdh1",
  },
  {
    name: "Chainlink",
    code: "link",
    address: "0x67C8B44e6f47BAEbDd2236fcE6E84bA2c4A9E1d9",
  },
  {
    name: "Bitcoin cash",
    code: "bch",
    address: "qpyduwmd7ttdg9xxcety2qtgxputfa4sfy00pz4pfd",
  },
  {
    name: "Ethereum Classic",
    code: "etc",
    address: "0xb856eBEd39f47Eb27050b7358a1dD9bA03C75b14",
  },
  {
    name: "Dogecoin",
    code: "doge",
    address: "DDaYMNtJxVc3hBtpT2vZXgjrUQcCSbRo6z",
  },
  {
    name: "USD Coin",
    code: "usdc",
    address: "0x67C8B44e6f47BAEbDd2236fcE6E84bA2c4A9E1d9",
  },
  {
    name: "Binance Coin",
    code: "bnb",
    address: "bnb1naxqmp8enlm8jffd5pzw7elkgnh6c32kfwc2d0",
  },
]

function Donate() {
  const [selected, setSelected] = useState("")

  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") setSelected("")
  })

  return (
    <>
      <Alex face="^ ᗜ ^">
        <h3>Support Reddikulus by donating crypto! </h3>
      </Alex>

      <div className={styles.cryptos}>
        {cryptos.map((c) => (
          <div key={c.code} className={styles.crypto}>
            <div className={styles.up}>
              <div className={styles.left}>
                <img
                  className={styles.logo}
                  src={`crypto/${c.code}.svg`}
                  width={50}
                  height={50}
                  alt=""
                />
                <b>{c.name}</b>
              </div>

              <div className={styles.right}>
                {/* <span
                  className={styles.copy}
                  onClick={() => {
                    navigator.clipboard.writeText(c.key)
                  }}
                >
                  COPY
                </span> */}
                <img
                  src="qrcode.svg"
                  alt=""
                  // width="30px"
                  height="100%"
                  onClick={() => setSelected(c.code)}
                />
              </div>
            </div>
            <p>{c.address}</p>
          </div>
        ))}
      </div>
      {selected && (
        <div className={styles.popup} onClick={() => setSelected("")}>
          <img src={`qr/${selected}.png`} alt="" />
        </div>
      )}
    </>
  )
}

// function Qrcode() {
//   return (
//     <div className={styles.popup} onClick={}>
//       <img src="qrcode.svg" alt="" />
//     </div>
//   )
// }
export default Donate
