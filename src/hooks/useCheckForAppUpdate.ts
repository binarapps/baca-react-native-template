import { useSystemControllerCheckForAppUpdate } from '@baca/api/query/system/system'
import { useTranslation } from '@baca/hooks'
import * as Application from 'expo-application'
import { useEffect, useState } from 'react'
import { Platform, Alert, Linking } from 'react-native'

export const useCheckForAppUpdate = () => {
  const { t } = useTranslation()
  const currentVersion = Application.nativeApplicationVersion || 'unknown'
  const { OS } = Platform
  const APP_STORE_URL = `https://apps.apple.com/app/id`
  const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=`
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
            setIsUpdateLoading(false)
          },
          onError: (error) => {
            console.error('Error checking for updates:', error)
            // CONFIG: Add log to your analytics service, for example - sentry o crashlytics
            setIsUpdateLoading(false)
          },
        }
      )
    } else {
      setIsUpdateLoading(false)
    }
  }, [OS, currentVersion, checkForUpdate, t])

  return isUpdateLoading
}
