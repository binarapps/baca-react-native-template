import { theme } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'

export const useTheme = (): AppTheme => {
  const { colorScheme } = useColorScheme()

  return theme[colorScheme]
}
