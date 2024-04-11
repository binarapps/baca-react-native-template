import { isExpoGo, isWeb } from '@baca/constants'

import { NativeFacebookButton } from './NativeFacebookButton'

export const FacebookButton = () => {
  if (isExpoGo || isWeb) return undefined //TODO: Add facebook button for web

  return <NativeFacebookButton />
}
