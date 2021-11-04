import Content from "../../components/content"

function Popular() {
  return (
    <Content
      api="/api/posts"
      params={{ sub: "popular" }}
      sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
    />
  )
}
export default Popular
