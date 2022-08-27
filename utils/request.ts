export default async function request(
  path: string
  // params?: { [key: string]: string }
) {
  console.log(`https://api.reddit.com/${path}&&raw_json=1`)
  let r = await fetch(`https://api.reddit.com/${path}&&raw_json=1`)

  let d = await r.json()
  return d
}
