'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateScreen = void 0
const fs_1 = __importDefault(require('fs'))
const prompt_sync_1 = __importDefault(require('prompt-sync'))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const select_prompt_1 = __importDefault(require('select-prompt'))
const constants_1 = require('../constants')
const utils_1 = require('../utils')
/**
 * Recursively prompts the user to select a subdirectory and calls itself with the selected subdirectory path.
 *
 * @param basePath - The path of the current directory.
 */
const selectPath = (basePath) =>
  new Promise((resolve) => {
    let result = basePath
    const subDirectories = (0, utils_1.getDirectoryNames)(basePath)
    if (subDirectories.length) {
      const subDirectoryPrompt = subDirectories.map((directoryName) => ({
        title: directoryName,
        value: directoryName,
      }))
      if (basePath !== constants_1.APP_ROUTER_DIRECTORY) {
        subDirectoryPrompt.unshift({ title: '.', value: '.' })
      }
      ;(0, select_prompt_1.default)(
        `Select a directory (${basePath.split(process.cwd())[1]})`,
        subDirectoryPrompt,
        {
          cursor: 0,
        }
      ).on('submit', (subValue) => {
        if (subValue === '.') {
          result = basePath
          resolve(result) // Return the result when subValue is '.'
          return
        }
        selectPath(`${basePath}/${subValue}`).then((subResult) => {
          result = subResult
          resolve(result) // Return the result when subValue is not '.'
        })
      })
    } else {
      resolve(result) // Return the result when there are no subdirectories
    }
  })
/**
 * Validates if a route with the given name already exists in the specified path.
 * @param routeName - The name of the route.
 * @param routePath - The path where the route should be generated.
 * @throws Error if the route already exists in the specified path.
 */
const validateRoute = (routeName, routePath) => {
  const filePath = `${routePath}/${routeName}.tsx`
  if (fs_1.default.existsSync(filePath)) {
    throw new Error(`Route ${routeName} already exists in ${routePath}`)
  }
}
/**
 * Creates a route file with the given route name and path.
 * @param {string} routeName - The name of the route.
 * @param {string} routePath - The path where the route file will be created.
 */
const createRouteFile = (routeName, routePath) => {
  // TODO: Check if its the tab - if so - add under new directory
  const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
  fs_1.default.writeFileSync(
    `${routePath}/${routeName.toLowerCase()}.tsx`,
    `import { ${screenName} } from '@baca/screens'

export default ${screenName}
`
  )
}
/**
 * Validates if a screen with the given name already exists.
 * @param screenName - The name of the screen.
 * @throws Error if the screen already exists.
 */
const validateScreen = (screenName) => {
  const filePath = `${constants_1.SCREENS_DIRECTORY}/${screenName}.tsx`
  if (fs_1.default.existsSync(filePath)) {
    throw new Error(`Screen ${screenName} already exists in ${constants_1.SCREENS_DIRECTORY}`)
  }
}
/**
 * Creates a screen file with the given screen name.
 * @param {string} screenName - The name of the screen.
 */
const createScreenFile = (baseName) => {
  const screenName = `${baseName.charAt(0).toUpperCase() + baseName.slice(1)}Screen`
  const screenFromFile = fs_1.default.readFileSync('./templates/screen_template.tsx', 'utf8')
  const screenContent = screenFromFile
    .replaceAll('_NAME_', screenName)
    .replace("// @ts-expect-error: it's a template and will be removed", '')
  fs_1.default.writeFileSync(`${constants_1.SCREENS_DIRECTORY}/${screenName}.tsx`, screenContent, {
    encoding: 'utf-8',
    flag: 'w',
  })
}
const addToScreensIndex = (baseName) => {
  const screenName = `${baseName.charAt(0).toUpperCase() + baseName.slice(1)}Screen`
  const indexFilePath = `${constants_1.SCREENS_DIRECTORY}/index.ts`
  const indexFile = fs_1.default.readFileSync(indexFilePath, 'utf8')
  const newIndexFile = indexFile.padEnd(indexFile.length) + `export * from './${screenName}'\n`
  console.log({ indexFile, newIndexFile })
  fs_1.default.writeFileSync(indexFilePath, newIndexFile)
}
/**
 * Generates a screen based on user input.
 * Prompts the user to enter a screen name and selects a screen path.
 * Validates the screen name and path.
 */
const generateScreen = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const screenName = (0, prompt_sync_1.default)()('Enter screen name: ')
    const routePath = yield selectPath(constants_1.APP_ROUTER_DIRECTORY)
    validateRoute(screenName, routePath)
    createRouteFile(screenName, routePath)
    validateScreen(screenName)
    createScreenFile(screenName)
    addToScreensIndex(screenName)
  })
exports.generateScreen = generateScreen
