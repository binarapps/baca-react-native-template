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

/**
 * Adds a specified text after the first occurrence of the search text in the given content.
 * Throws an error if the search text is not found.
 *
 * @param {string} content - The content where text will be added.
 * @param {string} searchText - The text to search for in the content.
 * @param {string} textToAdd - The text to add after the search text.
 * @returns {string} - Updated content with the added text.
 * @throws {Error} - Throws error if searchText is not found.
 */
const addAfter = (content: string, searchText: string, textToAdd: string) => {
  if (!content.includes(searchText)) {
    throw new Error(`The searchText '${searchText}' was not found in the content.`)
  }
  return content.replace(searchText, searchText + textToAdd)
}

/**
 * Recursively prompts the user to select a subdirectory and calls itself with the selected subdirectory path.
 * Tracks the visited paths to prevent infinite loops and limits recursion depth to prevent stack overflow.
 *
 * @param basePath - The path of the current directory.
 * @param visitedPaths - A set to track visited directories and avoid cycles.
 * @param depth - The current depth of the recursion to enforce a limit.
 * @param maxDepth - The maximum allowed depth for recursion.
 * @returns {Promise<string>} - The selected path.
 */
const selectPath = async (
  basePath: string,
  visitedPaths = new Set<string>(),
  depth = 0,
  maxDepth = 10
): Promise<string> => {
  if (depth > maxDepth) {
    throw new Error('Maximum recursion depth exceeded')
  }

  if (visitedPaths.has(basePath)) {
    throw new Error('Cycle detected in directory structure')
  }

  visitedPaths.add(basePath)
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

  const selectPrompt = await prompt<{ subValue: string }>({
    name: 'subValue',
    message: 'What screen type do you want to generate?',
    choices: subDirectoryPrompt,
    type: 'select',
  })

  const promptAnswer = selectPrompt.subValue

  // Return the result when user selects current directory
  if (promptAnswer === '.') {
    return basePath
  }
  // Recursively execute path selection when promptAnswer is not the current directory
  const subResult = await selectPath(
    `${basePath}/${promptAnswer}`,
    visitedPaths,
    depth + 1,
    maxDepth
  )

  return subResult
}

/**
 * Validates if a route with the given name already exists in the specified path.
 * Checks for route name and route path validity.
 *
 * @param {string} routeName - The name of the route.
 * @param {string} routePath - The path where the route should be generated.
 * @throws {Error} - Throws an error if the route already exists or if the route name/path is missing.
 */
const validateRouteDetails = (routeName: string, routePath: string) => {
  if (!routeName) {
    throw new Error('Screen name is required')
  }

  if (!routePath) {
    throw new Error('Route path is required')
  }
}

/**
 * Validates if a route with the given name already exists in the specified path.
 * @param routeName - The name of the route.
 * @param routePath - The path where the route should be generated.
 * @throws Error if the route already exists in the specified path.
 */
const validateExpoRouterScreen = (routeName: string, routePath: string) => {
  validateRouteDetails(routeName, routePath)
  const fileName = kebabCase(routeName)
  const filePath = `${routePath}/${fileName}.tsx`
  if (fs.existsSync(filePath)) {
    throw new Error(`Screen: ${routeName} already exists in ${routePath}`)
  }
}

/**
 * Creates a route file with the given route name and path.
 * @param {string} routeName - The name of the expo route.
 * @param {string} routePath - The path where the route file will be created.
 * @param {boolean} isNewTab - A boolean indicating if the screen is a new tab.
 * @param {string} screenName - The name of the screen name.
 */
const createExpoRouterFile = (
  routeName: string,
  routePath: string,
  isNewTab: boolean,
  screenName: string
) => {
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

/**
 * Adds the specified screen to the screens index file.
 *
 * @param {string} screenName - The name of the screen to add to the index.
 */
const addToScreensIndex = (screenName: string) => {
  const indexFilePath = `${SCREENS_DIRECTORY}/index.ts`
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  const newIndexFile =
    indexFile +
    `export * from './${screenName}'
`

  fs.writeFileSync(indexFilePath, newIndexFile)
}

/**
 * Prompts the user to enter a tab name and returns the kebab-case version of the name.
 * Throws an error if the tab name is not provided.
 *
 * @returns {Promise<string>} - The tab name in kebab-case.
 * @throws {Error} - Throws error if tab name is not provided.
 */
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

/**
 * Updates the translations for the given tab name in both 'pl' and 'en' translation files.
 *
 * @param {string} tabName - The name of the tab to be updated in translations.
 * @param {string} newTabName - The formatted tab name to be used in translations.
 */
const updateTranslations = (tabName: string, newTabName: string) => {
  const polishTranslationsPath = `${TRANSLATIONS_DIRECTORY}/pl.json`
  const englishTranslationsPath = `${TRANSLATIONS_DIRECTORY}/en.json`

  const polishTranslations = JSON.parse(fs.readFileSync(polishTranslationsPath, 'utf8'))
  polishTranslations.bottom_tabs[tabName] = newTabName
  fs.writeFileSync(polishTranslationsPath, JSON.stringify(polishTranslations, null, 2))

  const englishTranslations = JSON.parse(fs.readFileSync(englishTranslationsPath, 'utf8'))
  englishTranslations.bottom_tabs[tabName] = newTabName
  fs.writeFileSync(englishTranslationsPath, JSON.stringify(englishTranslations, null, 2))
}

/**
 * Creates a new navigation tab with the given tab name, updates translations, and adds the tab configuration.
 *
 * @param {string} tabName - The name of the tab to create.
 */
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

  // Update translations for both 'pl' and 'en'
  updateTranslations(tabName, newTabName)

  const newContent = addAfter(navigationConfigFile, '// UPPER SIDE TABS', tabContent)
  fs.writeFileSync('./src/navigation/tabNavigator/navigation-config.ts', newContent)
}

/**
 * Prompts the user to enter a screen name and returns it in PascalCase.
 *
 * @returns {Promise<string>} - The PascalCase screen name.
 */
const promptScreenName = async (): Promise<string> => {
  const promptAnswer = await prompt<{ screenName: string }>({
    message: 'What is your screen name?',
    name: 'screenName',
    type: 'input',
  })

  const screenName = promptAnswer.screenName

  if (!screenName || typeof screenName !== 'string') {
    throw new Error('Screen name is required')
  }

  return screenName
}

/**
 * Handles the creation of a new tab.
 *
 * @param {string} routePath - The path of the route.
 * @returns {Promise<string>} - The new tab path after creation.
 */
const handleNewTabCreation = async (routePath: string): Promise<string> => {
  const tabName = await promptTabName()
  createNewNavTab(tabName)

  const newTabPath = routePath
    .replace('/new-tab', `/${tabName}`)
    .replace('/_New Tab_', `/${tabName}`)

  fs.mkdirSync(newTabPath)
  return newTabPath
}

/**
 * Generates a screen based on user input.
 * Prompts the user to enter a screen name and selects a screen path.
 * Validates the screen name and path.
 */
export const generateScreen = async () => {
  try {
    let routePath = await selectPath(APP_ROUTER_DIRECTORY)

    const isNewTab =
      routePath.includes('(tabs)') &&
      (routePath.includes('new-tab') || routePath.includes('_New Tab_'))

    if (isNewTab) {
      routePath = await handleNewTabCreation(routePath)
    }

    const screenName = await promptScreenName()

    const screenFileNameWithOutSlash = screenName.startsWith('/') ? screenName.slice(1) : screenName
    const screenFileName = pascalCase(screenFileNameWithOutSlash) + 'Screen'

    validateExpoRouterScreen(screenName, routePath)
    createExpoRouterFile(screenName, routePath, isNewTab, screenFileName)

    checkScreenExistence(screenFileName)
    createScreenFile(screenFileName)

    addToScreensIndex(screenFileName)

    logger.success(`Screen: ${screenFileName} generated successfully`)

    if (isNewTab) {
      logger.info(`New tab created at
    ${routePath}

Please open ./src/navigation/tabNavigator/navigation-config.ts and change icons for the new tab
`)
    }

    logger.info(`New screen created at
    ${SCREENS_DIRECTORY}/${screenFileName}.tsx

    Please open the file and add your content
`)
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message)
    }
  }
}
