import * as Updates from 'expo-updates'
import i18n from 'i18next'

import { alert } from './alert'
import { wait } from './wait'

import { isDevelopment } from '@/constants'

let isAlertOpened = false

const checkIfUpdateAvailable = async () => {
  try {
    if (!Updates.isEnabled) return { isAvailable: false }

    const update = await Updates.checkForUpdateAsync()
    return update
  } catch {
    return { isAvailable: false }
  }
}

export const checkForUpdates = async (shouldReload?: boolean) => {
  if (isDevelopment) return
  try {
    const update = await checkIfUpdateAvailable()

    if (!update.isAvailable) return

    await Updates.fetchUpdateAsync()

    if (shouldReload) {
      await wait(500)
      await Updates.reloadAsync()
      return
    }

    if (isAlertOpened) return
    isAlertOpened = true

    alert(i18n.t('update.alert_title'), i18n.t('update.alert_message'), [
      {
        text: i18n.t('common.cancel'),
        onPress: () => {
          isAlertOpened = false
        },
        style: 'cancel',
      },
      {
        text: i18n.t('update.restart'),
        onPress: async () => {
          await Updates.reloadAsync()
        },
      },
    ])
  } catch (e) {
    console.log('There was some error while checking updates', e)
  }
}
