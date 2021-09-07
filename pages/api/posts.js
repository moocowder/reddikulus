export default async (req, res) => {
  let { sub, sort, after } = req.query
  console.log(`https://reddit.com/r/${sub}+/${sort}.json?after=${after}`)
  let r = await fetch(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  let data = await r.json()
  res.status(200).json(data.data)
}
