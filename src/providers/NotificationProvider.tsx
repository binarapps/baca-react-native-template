import { ASYNC_STORAGE_KEYS } from '@baca/constants'
import { NotificationContextProvider, NotificationContextType } from '@baca/contexts'
import { useState, useMemo, useEffect, useAppStateActive } from '@baca/hooks'
import {
  assignPushToken,
  disableAndroidBackgroundNotificationListener,
  getNotificationFromStack,
  getNotificationStackLength,
} from '@baca/services'
import { store } from '@baca/store'
import { isSignedInAtom } from '@baca/store/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { PropsWithChildren, FC, useCallback } from 'react'
import { Alert, AlertButton } from 'react-native'

const deeplinkWhenNotificationReceived = async (
  notification: Notifications.Notification,
  deeplink?: string
) => {
  const { data: payload } = notification?.request?.content || {}
  const deeplinkPath: string | undefined = deeplink || (payload?.deeplink as string)

  // FIXME: Authenticated routes not working when user is logged out
  // It will not work properly when we will try to navigate to routes where user needs authentication
  // We need to find some way to look for this routes, and later delay navigating to this routes when user will log in
  // Alternatively we can prevent navigating to this routes when user is not logged in

  if (deeplinkPath) {
    router.push(deeplinkPath)
  }
}

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationContextType['permissionStatus']>()
  const [notification, setNotification] = useState<NotificationContextType['notification']>()
  const [inAppNotification, setInAppNotification] =
    useState<NotificationContextType['inAppNotification']>()

  const tryToRegisterPushToken = useCallback(async () => {
    const wasPushTokenSendStringified = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND
    )
    const wasPushTokenSend: boolean = JSON.parse(wasPushTokenSendStringified ?? 'false')

    if (wasPushTokenSend) {
      return
    }

    const isSignedIn = store.get(isSignedInAtom)

    if (!isSignedIn) {
      return
    }

    // This function will also be executed after first installation of app
    // It's used like that because we want to ask user for permissions
    const status = await assignPushToken()

    if (!status) {
      return
    }

    setPermissionStatus(status)
  }, [])

  // To update immediately permission status
  useAppStateActive(tryToRegisterPushToken, true)

  // ----------------------------------------------
  // fix notifications on android when app is killed
  // ----------------------------------------------
  useEffect(() => {
    while (getNotificationStackLength() > 0) {
      const androidBackgroundNotification = getNotificationFromStack()
      if (androidBackgroundNotification) {
        setNotification(androidBackgroundNotification)
        deeplinkWhenNotificationReceived(androidBackgroundNotification)
      }
    }
    disableAndroidBackgroundNotificationListener()

    // -------------------------------------------------------------
    // Listener for notifications when app is killed and in background
    // -------------------------------------------------------------
    const notificationResponseReceived = Notifications.addNotificationResponseReceivedListener(
      ({ notification }) => {
        setNotification(notification)
        deeplinkWhenNotificationReceived(notification)
      }
    )

    // --------------------------------------------------
    // listener for notifications when app is in background
    // --------------------------------------------------
    const notificationReceived = Notifications.addNotificationReceivedListener((notification) => {
      // This notification will be received when user have opened app in current moment
      // We need to display some UI component and this component should handle presses
      const { title, body, data } = notification?.request?.content || {}

      // TODO: Add translations here
      const buttons: AlertButton[] = [
        {
          text: 'Ok',
          style: 'default',
          onPress: () => deeplinkWhenNotificationReceived(notification),
        },
      ]

      // TODO: Add translations here
      if (data?.deeplink) {
        buttons.unshift({ text: 'Anuluj', style: 'cancel', onPress: () => undefined })
      }

      // TODO: Add translations here
      Alert.alert(title || 'Otrzymałeś powiadomienie', body || 'Przejdź dalej', buttons)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationResponseReceived)
      Notifications.removeNotificationSubscription(notificationReceived)
    }
  }, [])

  const value: NotificationContextType = useMemo(
    () => ({
      permissionStatus,
      setPermissionStatus,
      notification,
      setNotification,
      inAppNotification,
      setInAppNotification,
    }),
    [inAppNotification, notification, permissionStatus]
  )
  return <NotificationContextProvider value={value}>{children}</NotificationContextProvider>
}
