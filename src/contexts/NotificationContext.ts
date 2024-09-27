import { PermissionStatus } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { Dispatch, SetStateAction } from 'react'

import createGenericContext from '@/utils/createGenericContext'

export type ReceivedNotification =
  | (Notifications.Notification & { context: { [key: string]: string } })
  | null
  | undefined

export type NotificationContextType = {
  permissionStatus?: PermissionStatus
  setPermissionStatus: Dispatch<SetStateAction<PermissionStatus | undefined>>
  notification: ReceivedNotification
  setNotification: Dispatch<SetStateAction<ReceivedNotification>>
}

export const [useNotificationContext, NotificationContextProvider] =
  createGenericContext<NotificationContextType>('NotificationContext')
