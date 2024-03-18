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
import { PropsWithChildren, FC, useCallback } from 'react'

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationContextType['permissionStatus']>()
  const [notification, setNotification] = useState<NotificationContextType['notification']>()
  const [inAppNotification, setInAppNotification] =
    useState<NotificationContextType['inAppNotification']>()

  const tryToRegisterPushToken = useCallback(async () => {
    const wasPushTokenSendStrigified = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND
    )
    const wasPushTokenSend: boolean = JSON.parse(wasPushTokenSendStrigified ?? 'false')

    if (wasPushTokenSend) {
      return
    }

    const isSignedIn = store.get(isSignedInAtom)

    if (!isSignedIn) {
      return
    }

    // This function will also be executed after first instalation of app
    // It's used like that because we want to ask user for permissions
    const status = await assignPushToken()

    if (!status) {
      return
    }

    setPermissionStatus(status)
  }, [])

  // To update immediately permission status
  useAppStateActive(tryToRegisterPushToken, true)

  useEffect(() => {
    while (getNotificationStackLength() > 0) {
      const androidBackgroundNotification = getNotificationFromStack()
      if (androidBackgroundNotification) {
        setNotification(androidBackgroundNotification)
      }
    }
    disableAndroidBackgroundNotificationListener()

    const notificationResponseReceived = Notifications.addNotificationResponseReceivedListener(
      ({ notification }) => {
        setNotification(notification)
      }
    )

    const notificationReceived = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
      setInAppNotification(notification)
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
