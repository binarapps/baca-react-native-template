import { NativeGoogleButton } from './NativeGoogleButton'

import { isExpoGo } from '@baca/constants'

export const SignInWithGoogle = () => {
  if (isExpoGo) {
    return null
  }

  return <NativeGoogleButton />
}
