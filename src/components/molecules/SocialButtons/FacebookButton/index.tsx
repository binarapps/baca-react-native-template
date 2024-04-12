import { isExpoGo, isWeb } from '@baca/constants'

import { NativeFacebookButton } from './NativeFacebookButton'

export const FacebookButton = () => {
  //TODO: Add facebook button for web
  if (isExpoGo || isWeb) return null

  return <NativeFacebookButton />
}
