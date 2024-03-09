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
const addAfter = (content, searchText, textToAdd) => {
  return content.replace(searchText, searchText + textToAdd)
}
/**
 * Recursively prompts the user to select a subdirectory and calls itself with the selected subdirectory path.
 *
 * @param basePath - The path of the current directory.
 */
const selectPath = (basePath) =>
  new Promise((resolve) => {
    const subDirectories = (0, utils_1.getDirectoryNames)(basePath)
    if (subDirectories.length) {
      const subDirectoryPrompt = subDirectories.map((directoryName) => ({
        title: directoryName,
        value: directoryName,
      }))
      if (basePath.includes('tabs')) {
        subDirectoryPrompt.unshift({ title: '_New Tab_', value: 'new-tab' })
      }
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
        // Return the result when subValue is '.'
        if (subValue === '.') {
          resolve(basePath)
          return
        }
        // Return the result when subValue is not '.'
        selectPath(`${basePath}/${subValue}`).then((subResult) => {
          resolve(subResult)
        })
      })
      // Return the result when there are no subdirectories
    } else {
      resolve(basePath)
    }
  })
// /**
//  * Validates if a route with the given name already exists in the specified path.
//  * @param routeName - The name of the route.
//  * @param routePath - The path where the route should be generated.
//  * @throws Error if the route already exists in the specified path.
//  */
// const validateRoute = (routeName: string, routePath: string) => {
//   const filePath = `${routePath}/${routeName}.tsx`
//   if (fs.existsSync(filePath)) {
//     throw new Error(`Route ${routeName} already exists in ${routePath}`)
//   }
// }
// /**
//  * Creates a route file with the given route name and path.
//  * @param {string} routeName - The name of the route.
//  * @param {string} routePath - The path where the route file will be created.
//  */
// const createRouteFile = (routeName: string, routePath: string) => {
//   const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
//   fs.writeFileSync(
//     `${routePath}/${routeName.toLowerCase()}.tsx`,
//     `import { ${screenName} } from '@baca/screens'
// export default ${screenName}
// `,
//     {
//       encoding: 'utf-8',
//       flag: 'w',
//     }
//   )
// }
// /**
//  * Validates if a screen with the given name already exists.
//  * @param screenName - The name of the screen.
//  * @throws Error if the screen already exists.
//  */
// const validateScreen = (screenName: string) => {
//   const filePath = `${SCREENS_DIRECTORY}/${screenName}.tsx`
//   if (fs.existsSync(filePath)) {
//     throw new Error(`Screen ${screenName} already exists in ${SCREENS_DIRECTORY}`)
//   }
// }
// /**
//  * Creates a screen file with the given screen name.
//  * @param {string} screenName - The name of the screen.
//  */
// const createScreenFile = (screenName: string) => {
//   const screenFromFile = fs.readFileSync('./templates/screen_template.tsx', 'utf8')
//   const screenContent = screenFromFile
//     .replaceAll('_NAME_', screenName)
//     .replace("// @ts-expect-error: it's a template and will be removed", '')
//   fs.writeFileSync(`${SCREENS_DIRECTORY}/${screenName}.tsx`, screenContent)
// }
// const addToScreensIndex = (screenName: string) => {
//   const indexFilePath = `${SCREENS_DIRECTORY}/index.ts`
//   const indexFile = fs.readFileSync(indexFilePath, 'utf8')
//   const newIndexFile = indexFile.padEnd(indexFile.length) + `export * from './${screenName}'\n`
//   fs.writeFileSync(indexFilePath, newIndexFile)
// }
const createNewNavTab = () => {
  const tabName = (0, prompt_sync_1.default)()('Enter tab name: ')
  if (!tabName) {
    throw new Error('Tab name is required')
  }
  const navigationConfigFile = fs_1.default.readFileSync(
    './src/navigation/tabNavigator/navigation-config.ts',
    'utf8'
  )
  const tabContent = `
  {
    displayedName: '${tabName.charAt(0).toUpperCase() + tabName.slice(1)}',
    icon: 'zzz-line', // CONFIG: Add your icon name here
    iconFocused: 'zzz-fill', // CONFIG: Add your icon name here
    id: '${tabName}',
    name: '${tabName}',
  },`
  const newContent = addAfter(navigationConfigFile, '// UPPER SIDE TABS', tabContent)
  fs_1.default.writeFileSync('./src/navigation/tabNavigator/navigation-config.ts', newContent)
}
/**
 * Generates a screen based on user input.
 * Prompts the user to enter a screen name and selects a screen path.
 * Validates the screen name and path.
 */
const generateScreen = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const routeName = (0, prompt_sync_1.default)()('Enter screen name: ')
    if (!routeName) {
      throw new Error('Screen name is required')
    }
    const routePath = yield selectPath(constants_1.APP_ROUTER_DIRECTORY)
    console.log({ routeName, routePath })
    const isNewTab = routePath.includes('tabs') && routePath.includes('new-tab')
    if (isNewTab) {
      createNewNavTab()
    }
    // validateRoute(routeName, routePath)
    // createRouteFile(routeName, routePath)
    // const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
    // validateScreen(screenName)
    // createScreenFile(screenName)
    // addToScreensIndex(screenName)
  })
exports.generateScreen = generateScreen
