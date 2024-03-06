#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const json = fs.readFileSync('./assets/figma/variables.json')

const figmaVariables = JSON.parse(json)

const collections = figmaVariables.collections

const primitivesCollection = collections.find((collection) => collection.name === '_Primitives')
const colorsCollection = collections.find((collection) => collection.name === '1. Color modes')

const primitivesColors = primitivesCollection.modes
  .find((mode) => mode.name === 'Style')
  .variables.filter((variable) => variable.type === 'color')
  .map((color) => ({ name: color.name, value: color.value }))

// colorMode could be either 'light' or 'dark'
const getModeColors = (colorMode) => {
  const modeName = colorMode === 'light' ? 'Light mode' : 'Dark mode'
  const modeColors = colorsCollection.modes.find((mode) => mode.name === modeName)?.variables
  const colors = modeColors
    .map((variable) => {
      if (variable.isAlias) {
        if (variable.value.collection === '_Primitives') {
          const primitiveColor = primitivesColors.find(
            (color) => color.name === variable.value.name
          )
          if (primitiveColor) {
            return { name: variable.name, value: primitiveColor.value }
          }
          return null
        } else {
          const newColor = modeColors.find((color) => color.name === variable.value.name)
          if (newColor) {
            const primitiveColor = primitivesColors.find(
              (color) => color.name === newColor.value.name
            )
            if (primitiveColor) {
              return { name: variable.name, value: primitiveColor.value }
            }
          }
        }
        return null
      } else if (!variable.isAlias) {
        return { name: variable.name, value: variable.value }
      } else return null
    })
    .filter(Boolean)

  const colorsArray = colors.map((color) => {
    return { [color.name.split('/').pop().split(' ').shift() || '']: color.value }
  })

  const colorsInMode = colorsArray.reduceRight((acc, color) => {
    const [entries] = Object.entries(color)

    const nestedKeys = entries[0].split('-')

    const newValue = createNestedObject(nestedKeys, entries[1])

    return mergeObjects(acc, newValue)
  }, {})

  const sortedColors = sortObject(colorsInMode)
  return sortedColors
}

const light = getModeColors('light')
const dark = getModeColors('dark')

const primitivesColorsArray = primitivesColors.map((color) => {
  return { [color.name.split('/').slice(1).join('-')]: color.value }
})

const primitives = primitivesColorsArray.reduceRight((acc, color) => {
  const [entries] = Object.entries(color)

  const colorName = entries[0].split('_')

  const nestedKeys = colorName[0].split('-')
  if (colorName[1]) {
    nestedKeys.push(colorName[1])
  }

  const newValue = createNestedObject(nestedKeys, entries[1])

  return mergeObjects(acc, newValue)
}, {})

// Export colors to file

const theme = {
  darkMode: dark,
  lightMode: light,
  primitives: sortObject(primitives),
}

const objectString = `export const themeColors = ${JSON.stringify(theme, null, 2)}`

// Specify the file path
const filePath = './src/design-system/config/colors.ts'

fs.writeFileSync(filePath, objectString, 'utf-8')

// Utils
function createNestedObject(keys, value) {
  if (keys.length === 0) {
    return value
  }

  const key = keys[0]
  const remainingKeys = keys.slice(1)

  const nestedObject = {}
  nestedObject[key] = createNestedObject(remainingKeys, value)

  return nestedObject
}

function mergeObjects(obj1, obj2) {
  // Initialize the result object
  const result = {}

  // Loop through keys in obj1
  for (const key in obj1) {
    // If the key is present in both obj1 and obj2 and both values are objects
    if (key in obj2 && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      // Recursively merge the nested objects
      result[key] = mergeObjects(obj1[key], obj2[key])
    } else {
      // Otherwise, prioritize the value from obj2
      result[key] = obj2[key] !== undefined ? obj2[key] : obj1[key]
    }
  }

  // Loop through keys in obj2
  for (const key in obj2) {
    // If the key is not present in obj1, add it to the result object
    if (!(key in obj1)) {
      result[key] = obj2[key]
    }
  }

  return result
}

function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObject)
  }

  const sorted = {}
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = sortObject(obj[key])
    })
  return sorted
}
