import { HelperRenderJson, HelperSection } from '@baca/components'
import { ENV, isExpoGo } from '@baca/constants'
import { useNotificationContext } from '@baca/contexts'
import { Text, Button, ScrollView } from '@baca/design-system'
import { useCallback, useEffect, useState, useTranslation } from '@baca/hooks'
import { wait } from '@baca/utils'
import * as Clipboard from 'expo-clipboard'
import * as Notifications from 'expo-notifications'

export const PushNotificationsHelpersScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const { notification } = useNotificationContext()

  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<Notifications.NotificationPermissionsStatus>()

  const [listOfscheduledNotifications, setListOfScheduledNotifications] = useState<
    Notifications.NotificationRequest[]
  >([])

  const checkNotificationPermissionStatus = useCallback(async () => {
    const permissions = await Notifications.getPermissionsAsync()

    setNotificationPermissionStatus(permissions)
  }, [])

  useEffect(() => {
    checkNotificationPermissionStatus()
  }, [checkNotificationPermissionStatus])

  const getListOfScheduledNotificaitons = useCallback(async () => {
    const listOfScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync()

    setListOfScheduledNotifications(listOfScheduledNotifications)
  }, [])

  useEffect(() => {
    getListOfScheduledNotificaitons()
  }, [getListOfScheduledNotificaitons])

  const handleCopyPushToken = useCallback(async () => {
    try {
      if (!isExpoGo && !ENV.EAS_PROJECT_ID) {
        throw new Error(
          'You must set `projectId` in eas build then value will be available from Constants?.expoConfig?.extra?.eas?.projectId'
        )
      }
      const token = (
        await Notifications.getExpoPushTokenAsync(
          !isExpoGo
            ? {
                projectId: ENV.EAS_PROJECT_ID,
              }
            : {}
        )
      ).data

      console.log(token)
      await Clipboard.setStringAsync(token)
      alert('Copied push token to clipboard.')
    } catch (error) {
      console.log('error', error)
      alert(
        JSON.stringify({
          message: 'There was an error when copying push token',
          error,
        })
      )
    }
  }, [])

  const scheduleNotification = useCallback(async () => {
    const content = {
      body: 'PUSH BODY',
      title: 'PUSH TITLE',
      data: { deeplink: '/example/push-notifications-helpers' },
    }
    const trigger10Seconds = new Date(Date.now() + 1000 * 10)

    await Notifications.scheduleNotificationAsync({
      content,
      trigger: trigger10Seconds,
    })

    await wait(200)
    await getListOfScheduledNotificaitons()
  }, [getListOfScheduledNotificaitons])

  return (
    <ScrollView flexGrow={1} p={4}>
      <HelperSection header="Push token">
        <Button onPress={handleCopyPushToken}>{t('settings_screen.copy_push_token')}</Button>
      </HelperSection>

      <HelperSection header="Permissions">
        <Button onPress={checkNotificationPermissionStatus}>
          Check notifications permission status
        </Button>
        {notificationPermissionStatus && (
          <>
            <Text.LgBold>Notification permission status</Text.LgBold>
            <HelperRenderJson>{notificationPermissionStatus}</HelperRenderJson>
          </>
        )}
      </HelperSection>

      <HelperSection header="Last push notification data">
        <HelperRenderJson>{notification}</HelperRenderJson>
        {/* When there is no notification we would like to also display if notification is null or undefined */}
        <Text.MdMedium>{!notification ? typeof notification : undefined}</Text.MdMedium>
      </HelperSection>

      <HelperSection header="Scheduled notifications">
        <Button onPress={scheduleNotification}>Schedule new push notification - 10 seconds</Button>

        <Button onPress={getListOfScheduledNotificaitons}>
          Get list of scheduled notifications
        </Button>

        <Text.LgBold>List of scheduled notifications</Text.LgBold>
        {listOfscheduledNotifications.length ? (
          <HelperRenderJson>{listOfscheduledNotifications}</HelperRenderJson>
        ) : (
          <Text.MdMedium>No scheduled notifications</Text.MdMedium>
        )}
      </HelperSection>
    </ScrollView>
  )
}
