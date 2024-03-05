import { darkNavigationTheme, lightNavigationTheme } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { useMemo } from 'react'

import { useTheme } from '../useTheme'

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
