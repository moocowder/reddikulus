import Content from "../../components/content"

function Popular() {
  return (
    <Content
      api="/api/posts"
      params={{ sub: "popular", sort: "hot" }}
      sorts={["hot", "new", "top", "rising"]}
    />
  )
}
export default Popular
