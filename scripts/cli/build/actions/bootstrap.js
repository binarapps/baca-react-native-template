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
exports.bootstrap = void 0
const fs_1 = __importDefault(require('fs'))
const prompt_sync_1 = __importDefault(require('prompt-sync'))
const constants_1 = require('../constants')
const utils_1 = require('../utils')
const prompt = (0, prompt_sync_1.default)()
/**
 * Replaces placeholders in the README file with the provided app name and organization owner.
 *
 * @param appName - The name of the app.
 * @param organizationOwner - The owner of the organization.
 */
const replaceReadme = (appName, organizationOwner) => {
  let contents = fs_1.default.readFileSync(constants_1.README_PATH, 'utf-8')
  contents = contents.replaceAll('_NAME_', appName)
  contents = contents.replaceAll('_OWNER_', organizationOwner)
  fs_1.default.writeFileSync(constants_1.README_PATH, contents)
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
const setUpAppConfig = (appName, bundleId, androidPackageName, scheme, easId, androidIconColor) => {
  let contents = fs_1.default.readFileSync(constants_1.APP_CONFIG_PATH, 'utf8')
  const appConfig = `
export const APP_CONFIG = {
  androidPackageName: '${androidPackageName}', // CONFIG: Add your android package name here
  appName: '${appName}', // CONFIG: Add your app name here
  easProjectId: '${easId}', // CONFIG: Add your eas project ID here
  iosBundleIdentifier: '${bundleId}', // CONFIG: Add your ios bundle identifier here
  scheme: '${scheme}', // CONFIG: Add your url scheme to link to your app
  adaptiveIconBackgroundColor: '${androidIconColor}', // CONFIG: Add your url scheme to link to your app
} as const
`
  contents = contents.replace(/(\/\/ APP_CONFIG_START)[\s\S]*?(\/\/ APP_CONFIG_END)/g, '$1$2')
  contents = (0, utils_1.addAfter)(contents, '// APP_CONFIG_START', `${appConfig}`)
  fs_1.default.writeFileSync(constants_1.APP_CONFIG_PATH, contents)
}
/**
 * Replaces the contents of the pull request template file with the contents of a new pull request template file.
 */
const replacePullRequestTemplate = () => {
  const contents = fs_1.default.readFileSync(constants_1.NEW_PULL_REQUEST_TEMPLATE_PATH, 'utf8')
  fs_1.default.writeFileSync(constants_1.PULL_REQUEST_TEMPLATE_PATH, contents)
}
const changeAppJson = (appName, appSlug, organizationOwner) => {
  const newAppJson = JSON.parse(fs_1.default.readFileSync(constants_1.APP_JSON_PATH, 'utf8'))
  newAppJson.expo.slug = appSlug
  newAppJson.expo.name = appName
  newAppJson.expo.owner = organizationOwner
  newAppJson.version = '1.0.0'
  fs_1.default.writeFileSync(constants_1.APP_JSON_PATH, JSON.stringify(newAppJson, null, 2))
}
const changePackageJson = (appName, organizationOwner) => {
  const packageJson = JSON.parse(fs_1.default.readFileSync('./package.json', 'utf8'))
  packageJson.name = `@${organizationOwner}/${appName}`
  packageJson.description = `App created from expo-template powered by binarapps`
  packageJson.version = '1.0.0'
  delete packageJson.repository
  delete packageJson.bugs
  delete packageJson.keywords
  fs_1.default.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
}
const removeIssueTemplates = () => {
  fs_1.default.rm('./.github/ISSUE_TEMPLATE', { recursive: true, force: true }, () => {})
}
const removeDocsFolder = () => {
  fs_1.default.rm('./documentation', { recursive: true, force: true }, () => {})
}
const setUpProject = (
  appName,
  bundleId,
  androidPackageName,
  scheme,
  easId,
  organizationOwner,
  androidIconColor,
  appSlug
) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // START
    utils_1.logger.success('Start ...')
    // 1. Delete readme -> and create new, with new app name etc.
    utils_1.logger.info('Generating new readme file')
    replaceReadme(appName, organizationOwner)
    // 2. Replace appName, bundleId, androidPackageName,scheme and easProjectId in app.config.ts file
    utils_1.logger.info('Change project variables in app.config.ts file')
    setUpAppConfig(appName, bundleId, androidPackageName, scheme, easId, androidIconColor)
    // 3. Delete exist pull request template -> generate the new
    utils_1.logger.info('Generating new pull request template file')
    replacePullRequestTemplate()
    // 4. Change app.json file
    utils_1.logger.info('Change app.json file')
    changeAppJson(appName, appSlug, organizationOwner)
    // 5. Change package.json file
    utils_1.logger.info('Change package.json file')
    changePackageJson(appName, organizationOwner)
    // 6. Remove issue templates
    utils_1.logger.info('Remove issue templates')
    removeIssueTemplates()
    // 7. Remove docs folder
    utils_1.logger.info('Remove docs folder')
    removeDocsFolder()
    //Finish
    utils_1.logger.success(`Config your project has been success`)
  })
const bootstrap = () => {
  utils_1.logger.info('Please give me this information to setup your project:')
  const appName = prompt('App name: ')
  if (!appName) {
    return utils_1.logger.error('Please write correct app name')
  }
  const appSlug = prompt('App slug (from expo dashboard): ')
  if (!appSlug) {
    return utils_1.logger.error('Please write app slug')
  }
  const organizationOwner = prompt('Organization owner (from expo dashboard): ')
  if (!organizationOwner) {
    return utils_1.logger.error('Please write organziation owner')
  }
  const easId = prompt('EAS project ID (from expo dashboard): ')
  if (!easId) {
    return utils_1.logger.error('Please write correct eas project ID')
  }
  const androidIconColor =
    prompt('Android adaptive icon color (you can leave it empty and fill it later): ') ||
    '#2E7AF0CC'
  const bundleId = prompt('Bundle ID (ios): ')
  if (!bundleId) {
    return utils_1.logger.error('Please write correct bundle ID')
  }
  const androidPackageName = prompt('Package name (android): ')
  if (!androidPackageName) {
    return utils_1.logger.error('Please write correct android package name')
  }
  const scheme = prompt('URL scheme (for deeplinking): ')
  if (!scheme) {
    return utils_1.logger.error('Please write correct scheme')
  }
  setUpProject(
    appName,
    bundleId,
    androidPackageName,
    scheme,
    easId,
    organizationOwner,
    androidIconColor,
    appSlug
  )
  utils_1.logger.info(
    '\nYou can also add images right now, go to assets folder and replace images to match your app \n'
  )
  utils_1.logger.info(
    '\nPlease verify the changes made by this script and commit it to your repository \n'
  )
}
exports.bootstrap = bootstrap
