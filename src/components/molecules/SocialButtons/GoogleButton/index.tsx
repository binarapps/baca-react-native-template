import { isExpoGo, isWeb } from '@baca/constants'

import { NativeGoogleButton } from './NativeGoogleButton'

export const GoogleButton = () => {
  //TODO: Add google button for web
  if (isExpoGo || isWeb) return null
  return <NativeGoogleButton />
}
