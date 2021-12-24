import Content from "../../components/content"

function Popular() {
  return (
    <Content
      // api="/api/posts"
      api="r/popular"
      // params={{ sub: "popular" }}
      params={{}}
      sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
    />
  )
}
export default Popular
