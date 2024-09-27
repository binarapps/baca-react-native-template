import { GoogleButtonProps, NativeGoogleButton } from './NativeGoogleButton'

import { isExpoGo, isWeb } from '@/constants'

export const GoogleButton = (props: GoogleButtonProps) => {
  //TODO: Add google button for web
  if (isExpoGo || isWeb) return null
  return <NativeGoogleButton {...props} />
}
