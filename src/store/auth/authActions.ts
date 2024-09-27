import { isSignedInAtom } from './authState'
import { removePushToken } from '../../services/NotificationService'
import { deleteToken } from '../../services/TokenService'
import { store } from '../store'

import { QueryKeys } from '@/enums'
import { queryClient } from '@/queryClient'

export async function signOut() {
  // set user logged out
  store.set(isSignedInAtom, false)

  // remove user profile data from device
  queryClient.removeQueries({ queryKey: [QueryKeys.USER_DATA] })

  // remove auth token from device
  await deleteToken()

  // remove push token from backend
  await removePushToken()
}
