interface Props {
  face: string
  size?: number
  style?: { [key: string]: string }
  children?: any
}

function Alex({ face, size = 32, style, children }: Props) {
  return (
    <div
      style={{ fontSize: size, textAlign: "center", margin: "50px", ...style }}
    >
      <div
        style={{
          color: "#ff0066",
          fontSize: size + 20,
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        ≽(
        <span style={{ color: "rgb(255, 181, 249)" }}>{face}</span>
        )≼
      </div>
      <span style={{ fontSize: size }}> {children}</span>
    </div>
  )
}
export default Alex
