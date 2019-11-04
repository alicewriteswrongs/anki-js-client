export const intervalToColor = interval => {
  let r,
    g,
    b = 0

  // arbitrarily high number
  let percentage = interval > 500 ? 1 : interval / 500.0

  percentage = percentage * 100

  if (percentage < 50) {
    r = 255
    g = Math.round(5.1 * percentage)
  } else {
    g = 255
    r = Math.round(510 - 5.1 * percentage)
  }
  let h = r * 0x10000 + g * 0x100 + b * 0x1
  return "#" + ("000000" + h.toString(16)).slice(-6)
}
