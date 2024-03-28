#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const util = require('util')

const execute = util.promisify(require('child_process').exec)
const appConfig = require('../app.json')

const LCERROR = '\x1b[31m%s\x1b[0m' //red
const LCWARN = '\x1b[33m%s\x1b[0m' //yellow
const LCINFO = '\x1b[36m%s\x1b[0m' //cyan
const LCSUCCESS = '\x1b[32m%s\x1b[0m' //green

const logger = class {
  static error(message, ...optionalParams) {
    console.error(LCERROR, message, ...optionalParams)
  }
  static warn(message, ...optionalParams) {
    console.warn(LCWARN, message, ...optionalParams)
  }
  static info(message, ...optionalParams) {
    console.info(LCINFO, message, ...optionalParams)
  }
  static success(message, ...optionalParams) {
    console.info(LCSUCCESS, message, ...optionalParams)
  }
}

const execPromise = async function (command, options) {
  try {
    const { stdout } = await execute(command, options)
    return stdout
  } catch (error) {
    console.error(error)
    throw new Error('Error executing command')
  }
}

const getAppName = (env) => {
  if (!env || env === 'production') {
    return appConfig.expo.name
  }

  return `${appConfig.expo.name} (${env})`
}

const generateHistoryOld = async () => {
  const args = process?.argv?.slice(2) ?? []

  if (args.length === 0) {
    console.error(
      "You didn't pass environment to script for example: `yarn generate:last:publish qa` "
    )
    return
  }

  const ENV = args[0]

  const appName = getAppName(ENV)

  const branchEnv = ENV?.toLowerCase?.() ?? 'qa'

  const historyStringified = await execPromise(
    `eas update:list --branch=${branchEnv} --non-interactive --limit=2 --json`
  )

  const history = JSON.parse(historyStringified)
  const envHistory = ENV ? history.currentPage.filter((item) => item.branch === branchEnv) : history

  const androidGroup = envHistory.find((item) => item.platforms === 'android')
  const iOSGroup = envHistory.find((item) => item.platforms === 'ios')
  const bothGroup = envHistory.find(
    (item) => item.platforms?.includes?.('android') && item.platforms?.includes?.('ios')
  )

  let androidHistoryItem
  let iosHistoryItem

  if (bothGroup) {
    const bothHistoryStringified = await execPromise(`eas update:view ${bothGroup?.group} --json`)

    const bothHistory = JSON.parse(bothHistoryStringified)

    androidHistoryItem = bothHistory?.find((item) => item.platform === 'android')
    iosHistoryItem = bothHistory?.find((item) => item.platform === 'ios')
  }

  if (androidGroup && iOSGroup) {
    const androidHistoryStringified = await execPromise(
      `eas update:view ${androidGroup?.group} --json`
    )

    const iOSHistoryStringified = await execPromise(`eas update:view ${iOSGroup?.group} --json`)

    const androidHistory = JSON.parse(androidHistoryStringified)
    const iOSHistory = JSON.parse(iOSHistoryStringified)

    androidHistoryItem = androidHistory?.[0]
    iosHistoryItem = iOSHistory?.[0]
  }

  // When there are two updates on iOS and Android
  if (iosHistoryItem?.id && androidHistoryItem?.id) {
    logger.info(`
${appName} - ${androidHistoryItem?.runtimeVersion}:
- android: ${androidHistoryItem?.id}
- ios: ${iosHistoryItem?.id}
  `)
    return
  }

  // When there is only update on iOS
  if (iosHistoryItem?.id) {
    logger.info(`
${appName} - ${iosHistoryItem?.runtimeVersion}:
- ios: ${iosHistoryItem?.id}
  `)
    return
  }

  // When there is only update on Android
  if (androidHistoryItem?.id) {
    logger.info(`
${appName} - ${androidHistoryItem?.runtimeVersion}:
- android: ${androidHistoryItem?.id}
  `)
    return
  }

  logger.error('Error while fetching updates history', iosHistoryItem, androidHistoryItem)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateHistory = async () => {
  const args = process?.argv?.slice(2) ?? []

  if (args.length === 0) {
    logger.error(
      "You didn't pass environment to script, for example: `yarn generate:last:publish qa` "
    )
    return
  }

  const ENV = args[0]

  const historyExists = fs.existsSync('./publish-history.json')
  if (!historyExists) {
    logger.error('You need to create build first, for example: `yarn publish:qa`')
    return
  }

  const updateInfoStringified = fs.readFileSync('./publish-history.json')
  const updateInfo = JSON.parse(updateInfoStringified)

  const firstUpdateInfo = updateInfo[0]
  const secondUpdateInfo = updateInfo[1]

  if (firstUpdateInfo && secondUpdateInfo) {
    logger.info(`
${ENV} - ${firstUpdateInfo?.runtimeVersion}:
- ${firstUpdateInfo?.platform}: ${firstUpdateInfo?.id}
- ${secondUpdateInfo?.platform}: ${secondUpdateInfo?.id}
`)
    fs.unlink('./publish-history.json', () => {})
    logger.success('Successfuly displayed last publish history')
  } else {
    logger.error('Error while updates fetching history, check "./publish-hisotry.json" file')
  }
}

generateHistoryOld()
