import { prompt } from 'enquirer'
import fs from 'fs'

import { APP_CONFIG } from '../../../app.config'
import {
  README_PATH,
  APP_CONFIG_PATH,
  NEW_PULL_REQUEST_TEMPLATE_PATH,
  PULL_REQUEST_TEMPLATE_PATH,
  APP_JSON_PATH,
  README_TEMPLATE_PATH,
} from '../constants'
import { logger, addAfter } from '../utils'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const newAppJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, 'utf8'))

type SetupProjectProps = {
  appName: string
  bundleId: string
  androidPackageName: string
  scheme: string
  easId: string
  organizationOwner: string
  androidIconColor: string
  appSlug: string
  appleTeamId: string
}

// Check types of questions here:
// - https://github.com/enquirer/enquirer/blob/master/examples/enquirer/questions.js
type Questions = keyof SetupProjectProps

type QuestionsObject = {
  [k in Questions]: {
    type: string
    message: string
    initial: string
    validation?: (value: string) => boolean | string
    simple?: boolean
    order: number
  }
}

type Question = {
  type: string
  message: string
  initial: string
  order: number
  name: string
}

const validatePackageName = (input: string): boolean | string => {
  const isValid = /^[a-zA-Z][a-zA-Z0-9\._]+$/.test(input)
  return isValid || 'Invalid package name format.'
}

const questionsObject: QuestionsObject = {
  appName: {
    type: 'text',
    message: 'What is your app name?',
    initial: APP_CONFIG.appName,
    simple: true,
    order: 1,
  },
  appSlug: {
    type: 'text',
    message: 'What is your expo app slug?',
    initial: newAppJson.expo.slug,
    simple: true,
    order: 2,
  },
  organizationOwner: {
    type: 'text',
    message: 'What is your expo organization owner?',
    initial: newAppJson.expo.owner,
    simple: true,
    order: 3,
  },
  bundleId: {
    type: 'text',
    message: 'What is your bundle Id?',
    initial: APP_CONFIG.iosBundleIdentifier,
    validation: validatePackageName,
    order: 4,
  },
  androidPackageName: {
    type: 'text',
    message: 'What is your android package name?',
    initial: APP_CONFIG.androidPackageName,
    validation: validatePackageName,
    order: 5,
  },
  scheme: {
    type: 'text',
    message: 'What is your scheme name?',
    initial: APP_CONFIG.scheme,
    order: 6,
  },
  easId: {
    type: 'text',
    message: 'What is your eas id?',
    initial: APP_CONFIG.easProjectId,
    order: 7,
  },
  androidIconColor: {
    type: 'text',
    message: 'What is your android icon color?',
    initial: APP_CONFIG.adaptiveIconBackgroundColor,
    order: 8,
  },
  appleTeamId: {
    type: 'text',
    message: 'What is your apple team id? (Optional)',
    // FIXME: GET IT FROM EAS.JSON
    initial: '5764GC687R',
    order: 9,
  },
}

/**
 * Replaces placeholders in the README file with the provided app name and organization owner.
 *
 * @param appName - The name of the app.
 * @param organizationOwner - The owner of the organization.
 */
const replaceReadme = ({ appName, organizationOwner }: SetupProjectProps) => {
  let contents = fs.readFileSync(README_TEMPLATE_PATH, 'utf-8')

  contents = contents.replaceAll('_NAME_', appName)
  contents = contents.replaceAll('_OWNER_', organizationOwner)

  console.log()

  fs.writeFileSync(README_PATH, contents)
}

/**
 * Sets up the app configuration by updating the contents of the app config file.
 *
 * @param appName - The name of the app.
 * @param bundleId - The bundle identifier for iOS.
 * @param androidPackageName - The package name for Android.
 * @param scheme - The URL scheme to link to the app.
 * @param easId - The EAS project ID.
 * @param androidIconColor - The background color for the adaptive icon on Android.
 */
const setUpAppConfig = ({
  appName,
  bundleId,
  androidPackageName,
  scheme,
  easId,
  androidIconColor,
}: SetupProjectProps) => {
  let contents = fs.readFileSync(APP_CONFIG_PATH, 'utf8')

  const appConfig = `
export const APP_CONFIG = {
  androidPackageName: '${androidPackageName}', // CONFIG: Add your android package name here
  appName: '${appName}', // CONFIG: Add your app name here
  easProjectId: '${easId}', // CONFIG: Add your eas project ID here
  iosBundleIdentifier: '${bundleId}', // CONFIG: Add your ios bundle identifier here
  scheme: '${scheme}', // CONFIG: Add your url scheme to link to your app
  adaptiveIconBackgroundColor: '${androidIconColor}', // CONFIG: Add your android adaptive icon background color here
} as const
`

  contents = contents.replace(/(\/\/ APP_CONFIG_START)[\s\S]*?(\/\/ APP_CONFIG_END)/g, '$1$2')

  contents = addAfter(contents, '// APP_CONFIG_START', `${appConfig}`)
  fs.writeFileSync(APP_CONFIG_PATH, contents)
}

/**
 * Replaces the contents of the pull request template file with the contents of a new pull request template file.
 */
const replacePullRequestTemplate = () => {
  const contents = fs.readFileSync(NEW_PULL_REQUEST_TEMPLATE_PATH, 'utf8')

  fs.writeFileSync(PULL_REQUEST_TEMPLATE_PATH, contents)
}

const changeAppJson = ({ appName, appSlug, organizationOwner }: SetupProjectProps) => {
  newAppJson.expo.slug = appSlug
  newAppJson.expo.name = appName
  newAppJson.expo.owner = organizationOwner
  newAppJson.expo.version = '1.0.0'

  fs.writeFileSync(APP_JSON_PATH, JSON.stringify(newAppJson, null, 2))
}

const changePackageJson = ({ appName, organizationOwner }: SetupProjectProps) => {
  packageJson.name = `@${organizationOwner}/${appName}`
  packageJson.description = `App created from expo-template powered by binarapps`
  packageJson.version = '1.0.0'

  delete packageJson.repository
  delete packageJson.homepage
  delete packageJson.bugs
  delete packageJson.keywords

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
}

const removeIssueTemplates = () => {
  fs.rm('./.github/ISSUE_TEMPLATE', { recursive: true, force: true }, () => {})
}

const removeDocsFolder = () => {
  fs.rm('./docs', { recursive: true, force: true }, () => {})
}

// TODO: Implement changeEasJson and changeDeeplinkFiles functions
const changeEasJson = (config: SetupProjectProps) => {}
const changeDeeplinkFiles = (config: SetupProjectProps) => {}

const setUpProject = async (config: SetupProjectProps) => {
  // START
  logger.success('Start bootstrapping ...')

  // 1. Delete readme -> and create new, with new app name etc.
  logger.info('Generating new readme file')
  replaceReadme(config)

  // 2. Replace appName, bundleId, androidPackageName,scheme and easProjectId in app.config.ts file
  logger.info('Change project variables in app.config.ts file')
  setUpAppConfig(config)

  // 3. Delete exist pull request template -> generate the new
  logger.info('Generating new pull request template file')
  replacePullRequestTemplate()

  // 4. Change app.json file
  logger.info('Change app.json file')
  changeAppJson(config)

  // 5. Change package.json file
  logger.info('Change package.json file')
  changePackageJson(config)

  // 6. Remove issue templates
  logger.info('Remove issue templates')
  removeIssueTemplates()

  // 7. Remove docs folder
  logger.info('Remove docs folder')
  removeDocsFolder()

  // 8. Change eas.json
  changeEasJson(config)

  // 9. Change deeplink files
  changeDeeplinkFiles(config)

  //Finish
  logger.success(`Config your project has been success`)
}

type BootstrapConfig = { isSimple: boolean }

const sortQuestions = (questions: Question[]) => {
  return questions.sort((a, b) => a.order - b.order)
}

const getQuesstions = ({ isSimple }: BootstrapConfig) => {
  const questions = Object.entries(questionsObject).map((value) => ({
    name: value[0],
    ...value[1],
  }))

  if (isSimple) {
    return sortQuestions(questions.filter((question) => question.simple))
  }

  return sortQuestions(questions)
}

export const bootstrap = async (config: BootstrapConfig) => {
  try {
    logger.info('Please give me this information to setup your project:')

    const answers = (await prompt(getQuesstions(config))) as unknown as SetupProjectProps

    await setUpProject(answers)

    logger.info(
      '\nYou can also add images (splash screen, app icon, logos) right now, \nGo to `assets` folder and replace images to match your app.\n'
    )
    logger.info('\nPlease verify the changes made by this script and commit it to your repository.')
  } catch (e) {
    logger.error(
      '\nError while bootstraping project \nERROR:',
      e ? e : "Couldn't find what's happened"
    )
  }
}
