import Content from "../../components/content"

function Popular() {
  return (
    <Content
      api={`r/popular/SORT?after=AFTER`}
      sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
    />
  )
}
export default Popular
