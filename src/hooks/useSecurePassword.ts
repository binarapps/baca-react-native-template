import { IconNames } from '@baca/types/icon'
import { useCallback, useState } from 'react'

export const useSecurePassword = (type?: 'text' | 'password') => {
  const isPasswordType = type === 'password'
  const [securePassword, setSecurePassword] = useState(isPasswordType)
  const iconName: IconNames = securePassword ? 'eye-line' : 'eye-off-line'

  const toggleSecurePassword = useCallback(() => {
    setSecurePassword(!securePassword)
  }, [securePassword])

  return {
    isPasswordType,
    securePassword,
    iconName,
    toggleSecurePassword,
  }
}
