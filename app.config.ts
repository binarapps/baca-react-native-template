import { ExpoConfig, ConfigContext } from '@expo/config'
import * as dotenv from 'dotenv'

dotenv.config()

const environments = {
  prod: 'production',
  stg: 'staging',
  qa: 'qa',
} as const

export const envValues = Object.values(environments)
export type Environments = (typeof envValues)[number]

const adaptiveIconPath = './assets/icons/android/adaptive-icon-'
const appIconPath = './assets/icons/ios/icon-'
const faviconPath = './assets/icons/web/favicon-'

// APP_CONFIG_START
export const APP_CONFIG = {
  androidPackageName: 'online.binarapps', // CONFIG: Add your android package name here
  appName: 'Template', // CONFIG: Add your app name here
  easProjectId: 'ac562c27-4a4e-4532-869f-fe6f9447bee6', // CONFIG: Add your eas project ID here
  iosBundleIdentifier: 'online.binarapps', // CONFIG: Add your ios bundle identifier here
  scheme: 'yourUrlScheme', // CONFIG: Add your url scheme to link to your app
  adaptiveIconBackgroundColor: '#2E7AF0CC', // CONFIG: Add your android adaptive icon background color here
} as const
// APP_CONFIG_END

const IS_DEV = process.env.IS_DEV === '1'

const runtimeVersion = { policy: IS_DEV ? 'sdkVersion' : 'appVersion' } as const

type Setup = { [key in Environments]: string }

// https://patorjk.com/software/taag/#p=display&h=0&v=0&c=c&f=ANSI%20Regular&t=CONFIG
/***
 *     ██████  ██████  ███    ██ ███████ ██  ██████
 *    ██      ██    ██ ████   ██ ██      ██ ██
 *    ██      ██    ██ ██ ██  ██ █████   ██ ██   ███
 *    ██      ██    ██ ██  ██ ██ ██      ██ ██    ██
 *     ██████  ██████  ██   ████ ██      ██  ██████
 *
 *
 */

// CONFIG: You can change the values below to adjust app
// You can also run `yarn bootstrap` script to make this steps more safety
export const EAS_ENV_CONFIG: { [key: string]: Setup } = {
  adaptiveIconBackgroundColor: {
    production: APP_CONFIG.adaptiveIconBackgroundColor,
    staging: '#0064FF', // TODO: Randomize APP_CONFIG.adaptiveIconBackgroundColor
    qa: '#041939', // TODO: Randomize APP_CONFIG.adaptiveIconBackgroundColor
  },
  adaptiveIcon: {
    production: `${adaptiveIconPath}production.png`,
    staging: `${adaptiveIconPath}staging.png`,
    qa: `${adaptiveIconPath}qa.png`,
  },
  androidPackageName: {
    production: `${APP_CONFIG.androidPackageName}`,
    staging: `${APP_CONFIG.androidPackageName}.stg`,
    qa: `${APP_CONFIG.androidPackageName}.qa`,
  },
  appIcon: {
    production: `${appIconPath}production.png`,
    staging: `${appIconPath}staging.png`,
    qa: `${appIconPath}qa.png`,
  },
  appName: {
    production: `${APP_CONFIG.appName}`,
    staging: `${APP_CONFIG.appName} (staging)`,
    qa: `${APP_CONFIG.appName} (qa)`,
  },
  favicon: {
    production: `${faviconPath}production.png`,
    staging: `${faviconPath}staging.png`,
    qa: `${faviconPath}qa.png`,
  },
  iosBundleIdentifier: {
    production: `${APP_CONFIG.iosBundleIdentifier}`,
    staging: `${APP_CONFIG.iosBundleIdentifier}.stg`,
    qa: `${APP_CONFIG.iosBundleIdentifier}.qa`,
  },
  scheme: {
    production: `${APP_CONFIG.scheme}`,
    staging: `${APP_CONFIG.scheme}-stg`,
    qa: `${APP_CONFIG.scheme}-qa`,
  },
} as const

const universalLinks = ['https://baca-six.vercel.app']

/***
 *    ██████  ██    ██ ███    ██  █████  ███    ███ ██  ██████
 *    ██   ██  ██  ██  ████   ██ ██   ██ ████  ████ ██ ██
 *    ██   ██   ████   ██ ██  ██ ███████ ██ ████ ██ ██ ██
 *    ██   ██    ██    ██  ██ ██ ██   ██ ██  ██  ██ ██ ██
 *    ██████     ██    ██   ████ ██   ██ ██      ██ ██  ██████
 *
 *
 *     ██████  ██████  ███    ██ ███████ ██  ██████
 *    ██      ██    ██ ████   ██ ██      ██ ██
 *    ██      ██    ██ ██ ██  ██ █████   ██ ██   ███
 *    ██      ██    ██ ██  ██ ██ ██      ██ ██    ██
 *     ██████  ██████  ██   ████ ██      ██  ██████
 *
 *
 */
// Please make sure you know what are you doing when you make some changes on the bottom

const associatedDomains = universalLinks.map((link) => link.replace('https://', 'applinks:'))
const intentFilters = universalLinks.map((link) => ({
  action: 'VIEW',
  autoVerify: true,
  data: [''].map(() => ({
    scheme: 'https',
    host: link.replace('https://', ''),
  })),
  category: ['BROWSABLE', 'DEFAULT'],
}))

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const ENVIRONMENT_NAME = (process.env.ENVIRONMENT_NAME || 'qa') as Environments

  if (!envValues.includes(ENVIRONMENT_NAME)) {
    throw Error(`${ENVIRONMENT_NAME} setup missing`)
  }

  return {
    ...config,
    android: {
      ...config.android,
      adaptiveIcon: {
        backgroundColor: EAS_ENV_CONFIG.adaptiveIconBackgroundColor[ENVIRONMENT_NAME],
        foregroundImage: EAS_ENV_CONFIG.adaptiveIcon[ENVIRONMENT_NAME],
      },
      package: EAS_ENV_CONFIG.androidPackageName[ENVIRONMENT_NAME],
      intentFilters,
    },
    extra: {
      eas: { projectId: APP_CONFIG.easProjectId },
      ENVIRONMENT_NAME,
      universalLinks,
      ...process.env,
    },
    icon: EAS_ENV_CONFIG.appIcon[ENVIRONMENT_NAME],
    ios: {
      ...config.ios,
      associatedDomains,
      bundleIdentifier: EAS_ENV_CONFIG.iosBundleIdentifier[ENVIRONMENT_NAME],
    },
    name: EAS_ENV_CONFIG.appName[ENVIRONMENT_NAME],
    owner: config.owner || 'binarapps',
    runtimeVersion,
    scheme: EAS_ENV_CONFIG.scheme[ENVIRONMENT_NAME],
    updates: { url: `https://u.expo.dev/${APP_CONFIG.easProjectId}` },
    web: {
      ...config.web,
      favicon: EAS_ENV_CONFIG.favicon[ENVIRONMENT_NAME],
    },
  }
}
