import { colorSchemes, ASYNC_STORAGE_KEYS } from '@baca/constants'
import {
  ColorSchemeContextProvider,
  ColorSchemeContextType,
  SettingColorSchemeName,
} from '@baca/contexts'
import { useState, useMemo, useCallback } from '@baca/hooks'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

const defaultColorScheme = colorSchemes.LIGHT

export const ColorSchemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setItem, getItem } = useAsyncStorage(ASYNC_STORAGE_KEYS.COLOR_SCHEME)
  const systemColorScheme = useRNColorScheme()

  const [colorSchemeSetting, setColorSchemeSetting] = useState<SettingColorSchemeName>(
    colorSchemes.SYSTEM
  )

  const colorScheme =
    (colorSchemeSetting === 'system' ? systemColorScheme : colorSchemeSetting) || defaultColorScheme

  useEffect(() => {
    const getInitialColorScheme = async () => {
      getItem((error, savedColorScheme) => {
        if (!error && savedColorScheme) {
          setColorSchemeSetting(savedColorScheme as SettingColorSchemeName)
        } else if (systemColorScheme) {
          // For old devices it's possible that system color scheme name is null or undefined
          setColorSchemeSetting(systemColorScheme)
        } else {
          setColorSchemeSetting(defaultColorScheme)
        }
      })
    }

    getInitialColorScheme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setNewColorSchemeSetting = useCallback(
    (newColorScheme: SettingColorSchemeName) => {
      const oldColorScheme = colorSchemeSetting
      setColorSchemeSetting(newColorScheme)
      setItem(newColorScheme, (error) => {
        if (error) {
          setColorSchemeSetting(oldColorScheme)
        }
        // TODO: Handle error
      })
    },
    [colorSchemeSetting, setItem]
  )

  const isDarkTheme = useMemo(() => colorScheme === 'dark', [colorScheme])

  const value: ColorSchemeContextType = useMemo(
    () => ({
      colorScheme,
      colorSchemeSetting,
      isDarkTheme,
      setColorSchemeSetting: setNewColorSchemeSetting,
    }),
    [colorScheme, colorSchemeSetting, isDarkTheme, setNewColorSchemeSetting]
  )

  return <ColorSchemeContextProvider value={value}>{children}</ColorSchemeContextProvider>
}
