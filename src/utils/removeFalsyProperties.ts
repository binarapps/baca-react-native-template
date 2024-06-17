/**
 * Removes falsy properties from an object.
 * @param obj - The object from which falsy properties will be removed.
 * @returns A new object with only truthy properties.
 */
export const removeFalsyProperties = <O extends object>(obj: O) => {
  const filteredObject = Object.entries(obj).reduce<Record<string, unknown>>((acc, curr) => {
    if (curr[1] || curr[1] === 0) {
      acc[curr[0]] = curr[1]
    }
    return acc
  }, {})

  return filteredObject
}
