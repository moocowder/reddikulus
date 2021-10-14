function date(number: number) {
  let date = new Date(number * 1000)

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  )
}
export default date
