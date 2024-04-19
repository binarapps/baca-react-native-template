import { isExpoGo, isWeb } from '@baca/constants'

import { GoogleButtonProps, NativeGoogleButton } from './NativeGoogleButton'

export const GoogleButton = (props: GoogleButtonProps) => {
  //TODO: Add google button for web
  if (isExpoGo || isWeb) return null
  return <NativeGoogleButton {...props} />
}
