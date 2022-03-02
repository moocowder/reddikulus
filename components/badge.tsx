interface Props {
  color?: string
}

function Badge({ color }: Props) {
  return (
    <div
      style={{
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
      <b>r/</b>
    </div>
  )
}
export default Badge
