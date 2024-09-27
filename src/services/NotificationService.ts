import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { ASYNC_STORAGE_KEYS, ENV } from '@/constants'

export const schedulePushNotification = async (request: Notifications.NotificationRequestInput) => {
  await Notifications.scheduleNotificationAsync(request)
}

// The notifications logic is splitted into two functions:
// 1. registerForPushNotificationsAsync - this function ask for permission and is setting necessary notifications settings
// 2. assignPushToken - this sends push token to backend - additionaly checking if noitifaction permissions are granted
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'web') {
    return
  }

  try {
    let token
    if (!Device.isDevice) {
      return token
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      // TODO: Handle error here, maybe send it to backend or sentry
      console.log('Failed to get push token for push notification!')
      return
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId: ENV.EAS_PROJECT_ID })).data
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PUSH_TOKEN, token)

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  } catch (e) {
    // TODO: Handle error here, maybe send it to backend or sentry
    console.log('Failed to get push token for push notification!', e)
  }
}

export const assignPushToken = async (): Promise<Notifications.PermissionStatus | undefined> => {
  if (Platform.OS === 'web') {
    return
  }

  let finalStatus: Notifications.PermissionStatus

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return finalStatus
    }

    const pushExpoToken = (
      await Notifications.getExpoPushTokenAsync({ projectId: ENV.EAS_PROJECT_ID })
    ).data

    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PUSH_TOKEN, pushExpoToken)

    if (!pushExpoToken) {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND, 'false')
      return finalStatus
    }

    // CONFIG: Send push token to backend
    console.log('SEND ME TO BACKEND', pushExpoToken)

    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND, 'true')
  } catch (e) {
    console.log('e', e)
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND, 'false')
  }
}

export const removePushToken = async () => {
  if (Platform.OS === 'web') {
    return
  }

  // remove push token from backend
  const pushTokenStorage = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.PUSH_TOKEN)

  if (pushTokenStorage) {
    // CONFIG: Remove push token from backend
    console.log('REMOVE ME from BACKEND', pushTokenStorage)
  }

  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND, 'false')
}

// Android notifications helpers
let notificationListener: Subscription | null = null

const notificationStack: Notifications.Notification[] = []

export const enableAndroidBackgroundNotificationListener = () => {
  if (Platform.OS !== 'android') return
  notificationListener = Notifications.addNotificationResponseReceivedListener(
    ({ notification }) => {
      notificationStack.push(notification)
    }
  )
}

export const disableAndroidBackgroundNotificationListener = () => {
  notificationListener?.remove()
}

export const getNotificationFromStack = () => notificationStack.shift()

export const getNotificationStackLength = () => notificationStack.length
