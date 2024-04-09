import { isExpoGo, isWeb } from '@baca/constants'

import { NativeGoogleButton } from './NativeGoogleButton'

export const GoogleButton = () => {
  if (isExpoGo || isWeb) return undefined //TODO: Add google button for web
  return <NativeGoogleButton />
}
