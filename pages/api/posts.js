export default async (req, res) => {
  let { sub, sort, after } = req.query
  console.log(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  let r = await fetch(
    `https://www.reddit.com/r/breakingbad/hot/.json?=&raw_json=1&t=&after=&count=0`
  )
  // let r = await fetch(
  //   `https://oauth.reddit.com/r/${sub}/${sort}?after=${after}&raw_json=1`,
  //   {
  //     headers: {
  //       Authorization: "Bearer 59500187-1sAhgADk_hxh8ValRo3w9vFdW_KOBQ",
  //     },
  //   }
  // )
  let data = await r.json()
  res.status(200).json(data.data)
}
