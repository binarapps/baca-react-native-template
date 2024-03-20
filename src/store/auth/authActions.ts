import { ASYNC_STORAGE_KEYS } from '@baca/constants'
import { deleteToken } from '@baca/services'
import { store } from '@baca/store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { isSignedInAtom } from './authState'

export async function signOut() {
  // set user logged out
  store.set(isSignedInAtom, false)

  // remove auth token from device
  await deleteToken()

  // remove push token from backend
  const pushTokenStorage = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.PUSH_TOKEN)

  if (pushTokenStorage) {
    // FIXME: Remove push token from backend
    console.log('REMOVE ME from BACKEND', pushTokenStorage)
  }

  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WAS_PUSH_TOKEN_SEND, 'false')
}
