import Link from "next/link"
function Topics({ topics }) {
  return (
    <ul>
      {topics.map((t) => (
        <li>
          {t.topic}
          <ul>
            {t.subs.map((s) => (
              <li style={{ color: "pink" }}>
                <Link href={`/r/${s.name}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
export default Topics
