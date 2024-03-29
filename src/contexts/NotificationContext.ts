import createGenericContext from '@baca/utils/createGenericContext'
import { PermissionStatus } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { Dispatch, SetStateAction } from 'react'

export type NotificationContextType = {
  permissionStatus?: PermissionStatus
  setPermissionStatus: Dispatch<SetStateAction<PermissionStatus | undefined>>
  notification?: Notifications.Notification
  setNotification: Dispatch<SetStateAction<Notifications.Notification | undefined>>
  inAppNotification?: Notifications.Notification
  setInAppNotification: Dispatch<SetStateAction<Notifications.Notification | undefined>>
}

export const [useNotificationContext, NotificationContextProvider] =
  createGenericContext<NotificationContextType>('NotificationContext')
