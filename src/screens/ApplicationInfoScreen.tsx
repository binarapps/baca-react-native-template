import { isExpoGo } from '@baca/constants'
import { Box, Button, Text } from '@baca/design-system'
import {
  useCallback,
  usePreventGoBack,
  useSafeAreaInsets,
  useScreenOptions,
  useTranslation,
} from '@baca/hooks'
// TODO: there are tons of more interesting methods there!
import * as Application from 'expo-application'
import * as Clipboard from 'expo-clipboard'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

const projectId = Constants.expoConfig?.extra?.eas?.projectId

export const ApplicationInfoScreen = (): JSX.Element => {
  const { i18n, t } = useTranslation()
  const { bottom } = useSafeAreaInsets()
  const { canGoBack, back } = useRouter()

  useScreenOptions({
    title: t('navigation.screen_titles.application_info'),
  })

  usePreventGoBack()

  const checkNotificationPermissionStatus = useCallback(async () => {
    const permissions = await Notifications.getPermissionsAsync()

    alert('Permission status' + JSON.stringify(permissions, null, 2))
  }, [])

  const handleCopyPushToken = useCallback(async () => {
    try {
      if (!isExpoGo && !projectId) {
        throw new Error(
          'You must set `projectId` in eas build then value will be available from Constants?.expoConfig?.extra?.eas?.projectId'
        )
      }
      const token = (
        await Notifications.getExpoPushTokenAsync(
          !isExpoGo
            ? {
                projectId,
              }
            : {}
        )
      ).data

      console.log(token)
      await Clipboard.setStringAsync(token)
      alert('Copied push token to clipboard.')
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button my={2} onPress={checkNotificationPermissionStatus}>
        Check notification perfmission status
      </Button>
      <Button my={2} onPress={handleCopyPushToken}>
        {t('settings_screen.copy_push_token')}
      </Button>
      <Text bold>{t('application_info_screen.navigation_info')}</Text>
      <Text>{Application.applicationId}</Text>
      <Text>{Application.applicationName}</Text>
      <Text>{Application.nativeApplicationVersion}</Text>
      <Text>{Application.nativeBuildVersion}</Text>
      <Text>{i18n.languages.join(', ')}</Text>
      {canGoBack() && (
        <>
          <Box flexGrow={1} />
          <Button my={2} onPress={back}>
            {t('common.go_back')}
          </Button>
          <Box pb={`${bottom}px`} />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
})
