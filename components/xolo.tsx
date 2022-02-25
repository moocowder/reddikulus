interface Props {
  text: string
  face: string
  style?: { [key: string]: string }
}

function Xolo({ text, face, style }: Props) {
  return (
    <span style={{ textAlign: "center", margin: "30px", ...style }}>
      <div
        style={{
          color: "#ff0066",
          fontSize: "38px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        ≽(
        <span style={{ color: "rgb(255, 181, 249)" }}>{face}</span>
        )≼
      </div>
      <div> {text}</div>
    </span>
  )
}
export default Xolo
