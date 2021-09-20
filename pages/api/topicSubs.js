import fs from "fs"

//get subs of a given topic
export default async (req, res) => {
  let { topic, page, size } = req.query
  let topics = JSON.parse(fs.readFileSync("data.json", "utf8"))
  page = Number(page)
  size = Number(size)
  console.log(page * size, page * size + page)
  console.log(topic, page, size)
  res.status(200).json(
    topics
      .find((t) => t.topic === topic)
      .subs.slice(page * size, page * size + size)
      .map((s) => {
        console.log("88888", s)
        return { name: s.name, icon: s.icon }
      })
  )
}
