export default async (req, res) => {
  console.log(req.query)
  let { sub, after } = req.query
  let r = await fetch(`https://reddit.com/r/${sub}.json?after=${after}`)
  let data = await r.json()
  res.status(200).json(data.data)
}
