type GetColorValueProps = {
  color?: ColorNames | string
  colors: Colors
}

export const getColorValue = ({ color, colors }: GetColorValueProps): string => {
  if (typeof color === 'string' && (color.startsWith('rgb') || color.startsWith('#'))) {
    return color
  }

  if (!color || typeof color === 'object') return colors.Base.transparent

  const keys = color.split('.')

  const colorToReturn = getPropertyByKeys(colors, keys)

  return colorToReturn
}

interface NestedObject {
  [key: string]: NestedObject | number | string | boolean
}

function getPropertyByKeys<T extends NestedObject>(obj: T, keys: string[]): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //  @ts-expect-error, hopefully the following will return color as string
  return keys.reduce((acc, key) => acc && acc[key], obj)
}
