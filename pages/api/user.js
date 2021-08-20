export default async (req, res) => {
  let { user, sort, after } = req.query

  let r = await fetch(
    // `https://reddit.com/u/${user}.json?sort=${sort}&after=${after}`
    `https://api.reddit.com/user/${user}/submitted?sort=${sort}&after=${after}`
  )
  let data = await r.json()
  res.status(200).json(data.data)
}
