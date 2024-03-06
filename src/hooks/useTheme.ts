import { useColorScheme } from '@baca/contexts'
import { theme } from '@baca/design-system/config'

export const useTheme = (): AppTheme => {
  const { colorScheme } = useColorScheme()

  return theme[colorScheme]
}
