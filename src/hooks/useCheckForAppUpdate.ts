import { useSystemControllerCheckForAppUpdate } from '@baca/api/query/system/system'
import { useTranslation } from '@baca/hooks'
import * as Application from 'expo-application'
import { useEffect, useState } from 'react'
import { Platform, Alert, Linking } from 'react-native'
import { APP_STORE_URL, PLAY_STORE_URL } from 'scripts/cli/constants'

const currentVersion = Application.nativeApplicationVersion || 'unknown'
const { OS } = Platform

export const useCheckForAppUpdate = () => {
  const { t } = useTranslation()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(true)

  const { mutate: checkForUpdate } = useSystemControllerCheckForAppUpdate()

  useEffect(() => {
    if (OS === 'ios' || OS === 'android') {
      checkForUpdate(
        {
          data: {
            currentVersion,
            os: OS,
          },
        },
        {
          onSuccess: ({ updateRequired, appId }) => {
            if (updateRequired) {
              const storeUrl =
                OS === 'ios' ? `${APP_STORE_URL}${appId}` : `${PLAY_STORE_URL}${appId}`
              Alert.alert(t('update.alert_title'), t('update.alert_message'), [
                { text: t('update.update_now'), onPress: () => Linking.openURL(storeUrl) },
              ])
            }
          },
          onError: (error) => {
            console.error('Error checking for updates:', error)
            // CONFIG: Add log to your analytics service, for example - sentry o crashlytics
          },
          onSettled: () => {
            setIsUpdateLoading(false)
          },
        }
      )
    } else {
      setIsUpdateLoading(false)
    }
  }, [checkForUpdate, t])

  return isUpdateLoading
}
