export const hex2rgba = (hex: string, alpha = 0.75) => {
  if (!hex || !hex.startsWith('#') || (hex.length !== 4 && hex.length !== 7)) {
    return `rgba(0, 0, 0, ${alpha})`
  }
  const newHex =
    hex.length === 4
      ? hex.split('').reduce((prev, curr) => {
          return prev + curr + curr
        })
      : hex

  const hexRegex = newHex.match(/\w\w/g)

  if (hexRegex?.some((x) => !x) || hexRegex?.length !== 3) {
    return `rgba(0, 0, 0, ${alpha})`
  }

  const [r, g, b] = hexRegex?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]
  return `rgba(${r},${g},${b},${alpha})`
}
