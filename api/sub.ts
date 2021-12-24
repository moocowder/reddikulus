export default async function sub(sub: string, sort: string, after: string) {
  //   let { sub, sort, after } = req.query
  //   console.log(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  let r = await fetch(
    `https://api.reddit.com/r/${sub}/${sort}?after=${after}&raw_json=1`
  )

  let data = await r.json()
  return data.data
  // res.status(200).json(data.data)
}
