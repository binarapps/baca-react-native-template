import fs from 'fs'
import prompt from 'prompt-sync'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import selectPrompt from 'select-prompt'

import { APP_ROUTER_DIRECTORY, SCREENS_DIRECTORY } from '../constants'
import { getDirectoryNames } from '../utils'

const addAfter = (content: string, searchText: string, textToAdd: string) => {
  return content.replace(searchText, searchText + textToAdd)
}

/**
 * Recursively prompts the user to select a subdirectory and calls itself with the selected subdirectory path.
 *
 * @param basePath - The path of the current directory.
 */
const selectPath = (basePath: string) =>
  new Promise<string>((resolve) => {
    const subDirectories = getDirectoryNames(basePath)
    if (subDirectories.length) {
      const subDirectoryPrompt = subDirectories.map((directoryName) => ({
        title: directoryName,
        value: directoryName,
      }))

      if (basePath.includes('tabs')) {
        subDirectoryPrompt.unshift({ title: '_New Tab_', value: 'new-tab' })
      }

      if (basePath !== APP_ROUTER_DIRECTORY) {
        subDirectoryPrompt.unshift({ title: '.', value: '.' })
      }

      selectPrompt(`Select a directory (${basePath.split(process.cwd())[1]})`, subDirectoryPrompt, {
        cursor: 0,
      }).on('submit', (subValue: string) => {
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

/**
 * Validates if a route with the given name already exists in the specified path.
 * @param routeName - The name of the route.
 * @param routePath - The path where the route should be generated.
 * @throws Error if the route already exists in the specified path.
 */
const validateRoute = (routeName: string, routePath: string) => {
  const filePath = `${routePath}/${routeName}.tsx`
  if (fs.existsSync(filePath)) {
    throw new Error(`Route ${routeName} already exists in ${routePath}`)
  }
}

/**
 * Creates a route file with the given route name and path.
 * @param {string} routeName - The name of the route.
 * @param {string} routePath - The path where the route file will be created.
 */
const createRouteFile = (routeName: string, routePath: string) => {
  const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
  fs.writeFileSync(
    `${routePath}/${routeName.toLowerCase()}.tsx`,
    `import { ${screenName} } from '@baca/screens'

export default ${screenName}
`,
    {
      encoding: 'utf-8',
      flag: 'w',
    }
  )
}

/**
 * Validates if a screen with the given name already exists.
 * @param screenName - The name of the screen.
 * @throws Error if the screen already exists.
 */
const validateScreen = (screenName: string) => {
  const filePath = `${SCREENS_DIRECTORY}/${screenName}.tsx`
  if (fs.existsSync(filePath)) {
    throw new Error(`Screen ${screenName} already exists in ${SCREENS_DIRECTORY}`)
  }
}

/**
 * Creates a screen file with the given screen name.
 * @param {string} screenName - The name of the screen.
 */
const createScreenFile = (screenName: string) => {
  const screenFromFile = fs.readFileSync('./templates/screen_template.tsx', 'utf8')
  const screenContent = screenFromFile
    .replaceAll('_NAME_', screenName)
    .replace("// @ts-expect-error: it's a template and will be removed", '')

  fs.writeFileSync(`${SCREENS_DIRECTORY}/${screenName}.tsx`, screenContent)
}

const addToScreensIndex = (screenName: string) => {
  const indexFilePath = `${SCREENS_DIRECTORY}/index.ts`
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  const newIndexFile = indexFile.padEnd(indexFile.length) + `export * from './${screenName}'\n`

  fs.writeFileSync(indexFilePath, newIndexFile)
}

const createNewNavTab = () => {
  const tabName = prompt()('Enter tab name: ')
  if (!tabName) {
    throw new Error('Tab name is required')
  }

  const navigationConfigFile = fs.readFileSync(
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
  fs.writeFileSync('./src/navigation/tabNavigator/navigation-config.ts', newContent)
}

/**
 * Generates a screen based on user input.
 * Prompts the user to enter a screen name and selects a screen path.
 * Validates the screen name and path.
 */
export const generateScreen = async () => {
  const routeName = prompt()('Enter screen name: ')
  if (!routeName) {
    throw new Error('Screen name is required')
  }

  const routePath = await selectPath(APP_ROUTER_DIRECTORY)

  const isNewTab = routePath.includes('tabs') && routePath.includes('new-tab')
  if (isNewTab) {
    createNewNavTab()
  }

  validateRoute(routeName, routePath)
  createRouteFile(routeName, routePath)

  const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
  validateScreen(screenName)
  createScreenFile(screenName)

  addToScreensIndex(screenName)
}
