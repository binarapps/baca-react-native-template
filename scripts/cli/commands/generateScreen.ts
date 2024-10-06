import { prompt } from 'enquirer'
import fs from 'fs'

import {
  TRANSLATIONS_DIRECTORY,
  APP_ROUTER_DIRECTORY,
  EXPO_ROUTER_FILE,
  NEW_TAB_LAYOUT_FILE,
  SCREENS_DIRECTORY,
} from '../constants'
import { getDirectoryNames, logger } from '../utils'
import { kebabCase, capitalCase, pascalCase } from '../utils/change-case'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Select } = require('enquirer')

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
    message: directoryName,
    name: directoryName,
  }))

  if (basePath.includes('tabs')) {
    subDirectoryPrompt.unshift({ message: '_New Tab_', name: 'new-tab' })
  }

  if (basePath !== APP_ROUTER_DIRECTORY) {
    subDirectoryPrompt.unshift({ message: '.', name: '.' })
  }

  const selectPrompt = new Select({
    name: 'subValue',
    message: 'What screen type do you want to generate?',
    choices: subDirectoryPrompt,
  })

  const promptAnswer = await selectPrompt.run()
  console.log('Answer:', promptAnswer)

  // Return the result when user selects current directory
  if (promptAnswer === '.') {
    return basePath
  }
  // Recursively execute path selection when promptAnswer is not the current directory
  const subResult = await selectPath(`${basePath}/${promptAnswer}`)

  return subResult
}

/**
 * Validates if a route with the given name already exists in the specified path.
 * @param routeName - The name of the route.
 * @param routePath - The path where the route should be generated.
 * @throws Error if the route already exists in the specified path.
 */
const validateExpoRouterScreen = (routeName: string, routePath: string) => {
  const fileName = kebabCase(routeName)
  const filePath = `${routePath}/${fileName}.tsx`
  if (fs.existsSync(filePath)) {
    logger.error(`Screen: ${routeName} already exists in ${routePath}`)

    throw new Error(`Screen: ${routeName} already exists in ${routePath}`)
  }

  if (!routeName) {
    logger.error('Screen name is required')
    throw new Error('Screen name is required')
  }

  if (!routePath) {
    logger.error('Route path is required')
    throw new Error('Route path is required')
  }
}

/**
 * Creates a route file with the given route name and path.
 * @param {string} routeName - The name of the route.
 * @param {string} routePath - The path where the route file will be created.
 * @param {boolean} isNewTab - A boolean indicating if the screen is a new tab.
 */
const createExpoRouterFile = (routeName: string, routePath: string, isNewTab: boolean) => {
  const screenName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Screen`

  if (isNewTab) {
    fs.writeFileSync(`${routePath}/index.tsx`, EXPO_ROUTER_FILE(screenName))
    fs.writeFileSync(`${routePath}/_layout.tsx`, NEW_TAB_LAYOUT_FILE)
  } else {
    const fileName = kebabCase(routeName)
    fs.writeFileSync(`${routePath}/${fileName}.tsx`, EXPO_ROUTER_FILE(screenName))
  }
}

/**
 * Validates if a screen with the given name already exists.
 * @param screenName - The name of the screen.
 * @throws Error if the screen already exists.
 */
const checkScreenExistence = (screenName: string) => {
  const filePath = `${SCREENS_DIRECTORY}/${screenName}.tsx`
  if (fs.existsSync(filePath)) {
    logger.error(`Screen ${screenName} already exists`)
  }
}

/**
 * Creates a screen file with the given screen name.
 * @param {string} screenName - The name of the screen.
 */
const createScreenFile = (screenName: string) => {
  const screenFromFile = fs.readFileSync('./templates/screen_template.tsx', 'utf8')
  const screenContent = screenFromFile.replace(/_NAME_/g, screenName)

  fs.writeFileSync(`${SCREENS_DIRECTORY}/${screenName}.tsx`, screenContent)
}

const addToScreensIndex = (screenName: string) => {
  const indexFilePath = `${SCREENS_DIRECTORY}/index.ts`
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  const newIndexFile = indexFile + `export * from './${screenName}'\n`

  fs.writeFileSync(indexFilePath, newIndexFile)
}

const promptTabName = async () => {
  const promptAnswer = await prompt<{ tabName: string }>({
    message: 'What is tab name?',
    name: 'tabName',
    type: 'input',
  })

  const tabName = kebabCase(promptAnswer.tabName)

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
    displayedNameTx: 'bottom_tabs.${tabName}',
    icon: 'zzz-line', // CONFIG: Add your icon name here
    iconFocused: 'zzz-fill', // CONFIG: Add your icon name here
    id: '${tabName}',
    name: '${tabName}',
  },`

  const newTabName = capitalCase(tabName.charAt(0).toUpperCase() + tabName.slice(1))

  // update pl and en translations
  const polishTranslations = JSON.parse(
    fs.readFileSync(`${TRANSLATIONS_DIRECTORY}/pl.json`, 'utf8')
  )
  polishTranslations.bottom_tabs[tabName] = newTabName
  fs.writeFileSync(`${TRANSLATIONS_DIRECTORY}/pl.json`, JSON.stringify(polishTranslations, null, 2))

  const englishTranslations = JSON.parse(
    fs.readFileSync(`${TRANSLATIONS_DIRECTORY}/en.json`, 'utf8')
  )
  englishTranslations.bottom_tabs[tabName] = newTabName
  fs.writeFileSync(
    `${TRANSLATIONS_DIRECTORY}/en.json`,
    JSON.stringify(englishTranslations, null, 2)
  )

  const newContent = addAfter(navigationConfigFile, '// UPPER SIDE TABS', tabContent)
  fs.writeFileSync('./src/navigation/tabNavigator/navigation-config.ts', newContent)
}

/**
 * Generates a screen based on user input.
 * Prompts the user to enter a screen name and selects a screen path.
 * Validates the screen name and path.
 */
export const generateScreen = async () => {
  let routePath = await selectPath(APP_ROUTER_DIRECTORY)

  const isNewTab =
    routePath.includes('(tabs)') &&
    // For some reason
    (routePath.includes('new-tab') || routePath.includes('_New Tab_'))
  if (isNewTab) {
    const tabName = await promptTabName()
    createNewNavTab(tabName)

    const newTabPath = routePath
      .replace('/new-tab', `/${tabName}`)
      .replace('/_New Tab_', `/${tabName}`)
    routePath = newTabPath

    fs.mkdirSync(newTabPath)
  }

  const promptAnswer = await prompt<{ screenName: string }>({
    message: 'What is your screen name?',
    name: 'screenName',
    type: 'input',
  })

  const screenName = promptAnswer.screenName

  if (!screenName || typeof screenName !== 'string') {
    return
  }

  validateExpoRouterScreen(screenName, routePath)
  createExpoRouterFile(screenName, routePath, isNewTab)

  const screenFileNameWithOutSlash = screenName.slice(1)
  const screenFileName = `${pascalCase(screenFileNameWithOutSlash)}Screen`
  checkScreenExistence(screenFileName)
  createScreenFile(screenFileName)

  addToScreensIndex(screenFileName)
}
