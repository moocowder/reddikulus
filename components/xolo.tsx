interface Props {
  text: string
  face: string
  style?: { [key: string]: string }
}

function Xolo({ text, face, style }: Props) {
  return (
    <span style={style}>
      {text}&nbsp;
      <span style={{ color: "#ff0066" }}>
        ≽(
        <span style={{ color: "rgb(255, 181, 249)" }}>{face}</span>
        )≼
      </span>
    </span>
  )
}
export default Xolo
