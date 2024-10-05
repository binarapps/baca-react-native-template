import { prompt } from 'enquirer'
// eslint-disable-next-line import/order
import fs from 'fs'

import { APP_ROUTER_DIRECTORY, NEW_TAB_LAYOUT_FILE, SCREENS_DIRECTORY } from '../constants'
import { getDirectoryNames, logger } from '../utils'
import { toKebabCase } from '../utils/toKebabCase'

const addAfter = (content: string, searchText: string, textToAdd: string) => {
  return content.replace(searchText, searchText + textToAdd)
}

/**
 * Recursively prompts the user to select a subdirectory and calls itself with the selected subdirectory path.
 *
 * @param basePath - The path of the current directory.
 */
const selectPath = async (basePath: string): Promise<string> => {
  const subDirectories = getDirectoryNames(basePath)
  const hasSubDirectories = subDirectories.length > 0

  // Return the result when there are no subdirectories
  if (!hasSubDirectories) {
    return basePath
  }

  const subDirectoryPrompt = subDirectories.map((directoryName) => ({
    name: directoryName,
    value: directoryName,
  }))

  if (basePath.includes('tabs')) {
    subDirectoryPrompt.unshift({ name: '_New Tab_', value: 'new-tab' })
  }

  if (basePath !== APP_ROUTER_DIRECTORY) {
    subDirectoryPrompt.unshift({ name: '.', value: '.' })
  }

  const promptAnswer = await prompt({
    name: 'subValue',
    message: 'What screen type do you want to generate?',
    type: 'select',
    choices: subDirectoryPrompt,
  })

  const subValue = subDirectoryPrompt.find(
    // @ts-expect-error: subValue not found on promptAnswer
    (promptValue) => promptValue.name === promptAnswer.subValue
  )?.value

  // Return the result when user selects current directory
  if (subValue === '.') {
    return basePath
  }
  // Recursively execute path selection when subValue is not the current directory
  const subResult = await selectPath(`${basePath}/${subValue}`)

  return subResult
}

/**
 * Validates if a route with the given name already exists in the specified path.
 * @param routeName - The name of the route.
 * @param routePath - The path where the route should be generated.
 * @throws Error if the route already exists in the specified path.
 */
const validateRoute = (routeName: string, routePath: string) => {
  const filePath = `${routePath}/${routeName}.tsx`
  if (fs.existsSync(filePath)) {
    logger.error(`Route ${routeName} already exists in ${routePath}`)
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
    `import { ${screenName} } from '@/screens'

export default ${screenName}
`
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
    logger.error(`Screen ${screenName} already exists`)
  }
}

/**
 * Creates a screen file with the given screen name.
 * @param {string} screenName - The name of the screen.
 * @param {boolean} isNewTab - A boolean indicating if the screen is a new tab.
 */
const createScreenFile = (screenName: string, isNewTab: boolean) => {
  const screenFromFile = fs.readFileSync('./templates/screen_template.tsx', 'utf8')
  const screenContent = screenFromFile.replaceAll('_NAME_', screenName)

  if (isNewTab) {
    fs.writeFileSync(`${SCREENS_DIRECTORY}/index.tsx`, screenContent)
    fs.writeFileSync(`${SCREENS_DIRECTORY}/_layout.tsx`, NEW_TAB_LAYOUT_FILE)
  } else {
    fs.writeFileSync(`${SCREENS_DIRECTORY}/${screenName}.tsx`, screenContent)
  }
}

const addToScreensIndex = (screenName: string) => {
  const indexFilePath = `${SCREENS_DIRECTORY}/index.ts`
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  const newIndexFile = indexFile.padEnd(indexFile.length) + `export * from './${screenName}'\n`

  fs.writeFileSync(indexFilePath, newIndexFile)
}

const promptTabName = async () => {
  const promptAnswer = await prompt({
    message: 'What is your screen name?',
    name: 'tabName',
    type: 'input',
  })

  // @ts-expect-error: generator not found on promptAnswer
  const tabName = toKebabCase(promptAnswer.tabName)

  if (!tabName) {
    throw new Error('Tab name is required')
  }

  return tabName
}

const createNewNavTab = (tabName: string) => {
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
  const promptAnswer = await prompt({
    message: 'What is your screen name?',
    name: 'screenName',
    type: 'input',
  })

  // @ts-expect-error: generator not found on promptAnswer
  const routeName = promptAnswer.screenName as string

  let routePath = await selectPath(APP_ROUTER_DIRECTORY)

  const isNewTab = routePath.includes('(tabs)') && routePath.includes('new-tab')
  if (isNewTab) {
    const tabName = promptTabName()
    createNewNavTab(routeName)

    const newTabPath = routePath.replace('/new-tab', `/${tabName}`)
    routePath = newTabPath

    fs.mkdirSync(newTabPath)
  }

  validateRoute(routeName, routePath)
  createRouteFile(routeName, routePath)

  const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`
  validateScreen(screenName)
  createScreenFile(screenName, isNewTab)

  addToScreensIndex(screenName)
}
