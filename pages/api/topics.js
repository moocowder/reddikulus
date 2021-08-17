export default async (req, res) => {
  let { topic } = req.query
  let r = await fetch(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  let data = await r.json()
  res.status(200).json(data.data)
}
