interface Props {
  text: string
  color: string
  side: number
}

function Badge({ text, color, side }: Props) {
  console.log(text)
  return (
    <div
      style={{
        width: side + "px",
        height: side + "px",
        backgroundColor: color || "#ff0066",
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
        {/* {text.charAt(0).toUpperCase() + text.substr(1, 2).toLowerCase()} */}
        r/
      </b>
    </div>
  )
}
export default Badge
