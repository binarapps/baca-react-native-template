import { useMemo } from 'react'

import { useTheme } from '../useTheme'

import { useColorScheme } from '@/contexts'
import { darkNavigationTheme, lightNavigationTheme } from '@/design-system/config'

export const useNavigationTheme = () => {
  const { colorScheme } = useColorScheme()
  const { colors } = useTheme()

  const tabBarTheme = useMemo(
    () => ({
      tabBarActiveTintColor: colors.button.primary.bg,
      tabBarInactiveTintColor: colors.button.primary.fg,
      tabBarStyle: {
        backgroundColor:
          colorScheme === 'dark' ? colors.button.primary.bg : colors.button.primary.fg,
        paddingTop: 4,
      },
      tabBarIconStyle: {
        marginTop: 0,
      },
    }),
    [colors.button.primary.bg, colors.button.primary.fg, colorScheme]
  )

  const navigationTheme = colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme

  return {
    navigationTheme,
    tabBarTheme,
  }
}
