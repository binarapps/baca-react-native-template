import { ENV, isExpoGo } from '@baca/constants'
import { useNotificationContext } from '@baca/contexts'
import { Box, Text, Button, ScrollView, Spacer } from '@baca/design-system'
import { useCallback, useEffect, useScreenOptions, useState, useTranslation } from '@baca/hooks'
import { wait } from '@baca/utils'
import * as Clipboard from 'expo-clipboard'
import * as Notifications from 'expo-notifications'

const Section = ({ header = '', children }: { header: string; children: React.ReactNode }) => {
  return (
    <Box p={4} borderRadius={16} bg="bg.active" mb={4}>
      <Text.XlBold>{header}</Text.XlBold>
      <Spacer y={2} />
      {children}
    </Box>
  )
}

export const PushNotificationsHelpersScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const { notification } = useNotificationContext()
  useScreenOptions({
    title: 'push notifications',
  })

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
      <Section header="Push token">
        <Button my={2} onPress={handleCopyPushToken}>
          {t('settings_screen.copy_push_token')}
        </Button>
      </Section>

      <Section header="Permissions">
        <Button my={2} onPress={checkNotificationPermissionStatus}>
          Check notifications permission status
        </Button>
        {notificationPermissionStatus && (
          <>
            <Spacer y={2} />
            <Text.LgBold>Notification permission status</Text.LgBold>
            <Text.MdMedium>{JSON.stringify(notificationPermissionStatus, null, 2)}</Text.MdMedium>
          </>
        )}
      </Section>

      <Section header="Last push notification data">
        <Text.MdMedium>
          {notification ? JSON.stringify(notification, null, 2) : "There wasn't any notification"}
        </Text.MdMedium>
        {/* When there is no notification we would like to also display if notification is null or undefined */}
        <Text.MdMedium>{!notification ? typeof notification : undefined}</Text.MdMedium>
      </Section>

      <Section header="Scheduled notifications">
        <Button my={2} onPress={scheduleNotification}>
          Schedule new push notification - 10 seconds
        </Button>

        <Button my={2} onPress={getListOfScheduledNotificaitons}>
          Get list of scheduled notifications
        </Button>

        <Spacer y={2} />
        <Text.LgBold>List of scheduled notifications</Text.LgBold>
        {listOfscheduledNotifications.length ? (
          <Text.MdMedium>{JSON.stringify(listOfscheduledNotifications, null, 2)}</Text.MdMedium>
        ) : (
          <Text.MdMedium>No scheduled notifications</Text.MdMedium>
        )}
      </Section>
    </ScrollView>
  )
}
