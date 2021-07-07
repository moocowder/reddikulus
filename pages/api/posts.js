export default async (req, res) => {
  let { sub, after } = req.query

  let r = await fetch(`https://reddit.com/${sub}.json?after=${after}`)
  let data = await r.json()
  res.status(200).json(data.data)
}
