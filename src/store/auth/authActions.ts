import { isSignedInAtom } from './authState'

import { deleteToken } from '~services'
import { store } from '~store/store'

export async function signOut() {
  await deleteToken()
  store.set(isSignedInAtom, false)
}
