import { deleteToken } from '@baca/services'
import { store } from '@baca/store/store'

import { isSignedInAtom } from './authState'

export async function signOut() {
  await deleteToken()
  store.set(isSignedInAtom, false)
}
