interface Props {
  color?: string
  side: number
}

function Badge({ color, side }: Props) {
  return (
    <div
      style={{
        width: side + "px",
        height: side + "px",
        backgroundColor: color || "#ffffff26",
        textAlign: "center",
        borderRadius: "100%",
        color: "white",
      }}
    >
      <b
        style={{
          lineHeight: side + "px",
        }}
      >
        r/
      </b>
    </div>
  )
}
export default Badge
