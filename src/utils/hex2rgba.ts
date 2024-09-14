export const hex2rgba = (hex: string, alpha?: number): string => {
  if (!hex || !hex.startsWith('#') || (hex.length !== 4 && hex.length !== 7 && hex.length !== 9)) {
    return `rgba(0, 0, 0, ${alpha !== undefined ? alpha : 0.75})`
  }

  let newHex = hex
  let calculatedAlpha = alpha !== undefined ? alpha : 0.75

  if (hex.length === 4) {
    newHex = hex.split('').reduce((prev, curr) => prev + curr + curr)
  } else if (hex.length === 9) {
    // Extract the alpha from the hex value
    const alphaHex = hex.slice(7, 9)
    calculatedAlpha = parseInt(alphaHex, 16) / 255
    newHex = hex.slice(0, 7)
  }

  const hexRegex = newHex.match(/\w\w/g)

  if (hexRegex?.some((x) => !x) || hexRegex?.length !== 3) {
    return `rgba(0, 0, 0, ${calculatedAlpha})`
  }

  const [r, g, b] = hexRegex?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]
  return `rgba(${r},${g},${b},${calculatedAlpha})`
}
