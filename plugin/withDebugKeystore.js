/* eslint-disable @typescript-eslint/no-var-requires */
const { withAppBuildGradle } = require('@expo/config-plugins')
const fs = require('fs')

module.exports = function withDebugKeystore(mainConfig, props) {
  const { storePassword, keyAlias, keyPassword } = props || {}
  const appBuildGradle = withAppBuildGradle(mainConfig, async (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      "storeFile file('debug.keystore')",
      "storeFile file('debug.jks')"
    )

    if (storePassword) {
      config.modResults.contents = config.modResults.contents.replace(
        "storePassword 'android'",
        `storePassword '2d4a995df1b18f0e16f1352eb227bee1'`
      )
    }

    if (keyAlias) {
      config.modResults.contents = config.modResults.contents.replace(
        "keyAlias 'androiddebugkey'",
        `keyAlias 'd163cbc4fe503964637c6dc4601a56ab'`
      )
    }

    if (keyPassword) {
      config.modResults.contents = config.modResults.contents.replace(
        "keyPassword 'android'",
        `keyPassword '9139334a6da1fcd2fdba63dfa74967f'`
      )
    }

    return config
  })

  const exist = fs.existsSync('./android/app/')

  // Plugins script is running couple of times so eventualy the file exist
  // if there will be some issues with moving this file, please add this to package json sripts
  // "eas-build-post-install": "mv agconnect-services.json android/app/agconnect-services.json",
  if (exist) {
    fs.copyFileSync('./debug.jks', './android/app/debug.jks')
  }

  return appBuildGradle
}
