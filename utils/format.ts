function format(number: number) {
  if (number < 1000) return number
  if (number < 1000000) return (Math.round(number / 100) / 10).toFixed(1) + "k"
  return (Math.round(number / 100000) / 10).toFixed(1) + "m"
}
export default format
