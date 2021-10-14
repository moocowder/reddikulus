export default async (req, res) => {
  let { token, sort, after } = req.query

  let r = await fetch(
    `https://oauth.reddit.com/${sort}?after=${after}&raw_json=1`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
  let data = await r.json()
  res.status(200).json(data.data)
}
