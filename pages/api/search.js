export default async (req, res) => {
  let { q, sort, after } = req.query
  let r = await fetch(
    `https://reddit.com/search.json?q=${q}&sort=${sort}&after=${after}`
  )
  let data = await r.json()
  res.status(200).json(data.data)
}
