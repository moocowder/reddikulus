import fs from "fs"

export default async (req, res) => {
  let { topic } = req.query
  let topics = JSON.parse(fs.readFileSync("data.json", "utf8"))
  // console.log(topics)
  // console.log(topic)
  // let { topic } = req.query
  // let r = await fetch(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  // let r = await fetch(`https://reddit.com/r/${sub}/${sort}.json?after=${after}`)
  // let data = await r.json()
  // res.status(200).json(data.data)
  res
    .status(200)
    .json(topics.find((t) => t.topic === topic).subs.map((s) => s.name))
}
