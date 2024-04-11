import { isSignedInAtom } from './authState'
import { removePushToken } from '../../services/NotificationService'
import { deleteToken } from '../../services/TokenService'
import { store } from '../store'

export async function signOut() {
  // set user logged out
  store.set(isSignedInAtom, false)

  // remove auth token from device
  await deleteToken()

  // remove push token from backend
  await removePushToken()
}
