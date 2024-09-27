import { AxiosError } from 'axios'
import { router } from 'expo-router'
import i18n from 'i18next'

import {
  isForceUpdateNeededAtom,
  isSignedInAtom,
  logoutMessageShownAtom,
  signOut,
  store,
} from '@/store'
import { alert } from '@/utils'

export const signOutWhenNotAuthorized = async (error: AxiosError) => {
  const isSignedIn = store.get(isSignedInAtom)

  if (!isSignedIn) {
    return
  }

  if (!error?.config?.headers?.Authorization && error.response?.status !== 401) {
    return
  }

  const isTokenInvalid = error?.config?.baseURL && error.response?.status === 401

  const isForceUpdateNeeded = store.get(isForceUpdateNeededAtom)

  const logoutMessageShown = store.get(logoutMessageShownAtom)

  if (!isForceUpdateNeeded && isTokenInvalid && !logoutMessageShown) {
    store.set(logoutMessageShownAtom, true)
    alert(i18n.t('alert.session_expired.title'), i18n.t('alert.session_expired.description'), [
      {
        text: 'Ok',
        onPress: async () => {
          await signOut()

          router.replace('/sign-in')

          store.set(logoutMessageShownAtom, false)
        },
      },
    ])
  }
}
