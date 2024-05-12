import { isDevelopment } from '@baca/constants'
import * as Updates from 'expo-updates'
import i18n from 'i18next'

import { alert } from './alert'
import { wait } from './wait'

let isAlertOpened = false

export const checkForUpdates = async (shouldReload?: boolean) => {
  if (isDevelopment) return
  try {
    const update = await Updates.checkForUpdateAsync()

    if (!update.isAvailable) return
    await Updates.fetchUpdateAsync()

    if (shouldReload) {
      await wait(500)
      await Updates.reloadAsync()
      return
    }

    if (isAlertOpened) return
    isAlertOpened = true

    alert(
      i18n.t('update.alert_title'),
      i18n.t('update.alert_message'),
      [
        {
          text: i18n.t('update.restart'),
          onPress: async () => {
            isAlertOpened = false
            await Updates.reloadAsync()
          },
        },
      ],
      { cancelable: false }
    )
  } catch (e) {
    console.error('There was some error while checking updates', e)
  }
}
