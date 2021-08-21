import fs from "fs"

//get subs of a given topic
export default async (req, res) => {
  let { topic } = req.query
  let topics = JSON.parse(fs.readFileSync("data.json", "utf8"))

  res
    .status(200)
    .json(topics.find((t) => t.topic === topic).subs.map((s) => s.name))
}
