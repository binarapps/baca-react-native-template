import { useColorScheme } from '@baca/contexts'
import { Icon, Touchable } from '@baca/design-system'
import { useCallback } from 'react'

export const ThemeSwitcherButton = () => {
  const { setColorSchemeSetting, colorSchemeSetting } = useColorScheme()

  const handleColorSchemeSettingChange = useCallback(() => {
    const scheme = colorSchemeSetting === 'light' ? 'dark' : 'light'
    setColorSchemeSetting(scheme)
  }, [colorSchemeSetting, setColorSchemeSetting])

  const icon = colorSchemeSetting === 'light' ? 'moon-clear-fill' : 'sun-fill'

  return (
    <Touchable onPress={handleColorSchemeSettingChange} p={4}>
      <Icon name={icon} size={24} color="text.primary" />
    </Touchable>
  )
}
