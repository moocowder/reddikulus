export default async function request(
  path: string
  // params?: { [key: string]: string }
) {
  let r = await fetch(`https://api.reddit.com/${path}&&raw_json=1`)

  let d = await r.json()
  return d
}
