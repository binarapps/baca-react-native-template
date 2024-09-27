import { useColorScheme } from '@/contexts'
import { theme } from '@/design-system/config'

export const useTheme = (): AppTheme => {
  const { colorScheme } = useColorScheme()

  return theme[colorScheme]
}
