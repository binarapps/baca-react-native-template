/* eslint-disable @typescript-eslint/no-var-requires */
const { withAppBuildGradle } = require('@expo/config-plugins')
const fs = require('fs')

module.exports = function withDebugKeystore(mainConfig, props) {
  const { storePassword, keyAlias, keyPassword } = props || {}

  if (!storePassword || !keyAlias || !keyPassword) {
    return
  }

  const appBuildGradle = withAppBuildGradle(mainConfig, async (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      "storeFile file('debug.keystore')",
      "storeFile file('debug.jks')"
    )

    if (storePassword) {
      config.modResults.contents = config.modResults.contents.replace(
        "storePassword 'android'",
        `storePassword '${storePassword}'`
      )
    }

    if (keyAlias) {
      config.modResults.contents = config.modResults.contents.replace(
        "keyAlias 'androiddebugkey'",
        `keyAlias '${keyAlias}'`
      )
    }

    if (keyPassword) {
      config.modResults.contents = config.modResults.contents.replace(
        "keyPassword 'android'",
        `keyPassword '${keyPassword}'`
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
