import { registerForPushNotificationsAsync as registerForPushNotifications } from '@baca/services'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

function useRouterNotificationsNative() {
  const router = useRouter()

  React.useEffect(() => {
    let isMounted = true

    function processUrl(url: string) {
      // In case you need to modify the URL to make it relative.
      return url
    }

    // Handle URL from expo push notifications
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted) {
        return
      }
      const url = response?.notification.request.content.data.url
      if (url) {
        router.replace(processUrl(url))
      }
    })

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const url = response.notification.request.content.data.url
      router.replace(processUrl(url))
    })

    return () => {
      isMounted = false
      subscription.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

if (Platform.OS !== 'web') {
  registerForPushNotifications()
}

export const useRouterNotifications =
  Platform.OS !== 'web' ? useRouterNotificationsNative : () => null
