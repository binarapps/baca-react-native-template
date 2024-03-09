import { isExpoGo } from '@baca/constants'

import { GoogleButton } from './GoogleButton'
import { NativeGoogleButton } from './NativeGoogleButton'

export const SignInWithGoogle = () => {
  if (isExpoGo) {
    return (
      <GoogleButton isDisabled={false} onPress={() => alert('Need to test on build version.')} />
    )
  }

  return <NativeGoogleButton />
}
