import { deleteToken, removePushToken } from '@baca/services'
import { store } from '@baca/store/store'

import { isSignedInAtom } from './authState'

export async function signOut() {
  // set user logged out
  store.set(isSignedInAtom, false)

  // remove auth token from device
  await deleteToken()

  // remove push token from backend
  await removePushToken()
}
