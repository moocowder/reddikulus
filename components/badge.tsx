interface Props {
  color?: string
  // side: number
}

function Badge({ color }: Props) {
  return (
    <div
      style={{
        // width: side,
        // height: side,
        width: "100%",
        height: "100%",
        backgroundColor: color || "#ffffff26",
        textAlign: "center",
        borderRadius: "100%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <b
        style={
          {
            // lineHeight: side + "px",
          }
        }
      >
        r/
      </b>
    </div>
  )
}
export default Badge
