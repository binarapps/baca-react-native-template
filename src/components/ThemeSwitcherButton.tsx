import { useColorScheme } from '@baca/contexts'
import { Icon } from '@baca/design-system'
import { useTheme } from '@baca/hooks'
import { MotiPressable } from 'moti/interactions'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'

export const ThemeSwitcherButton = () => {
  const { setColorSchemeSetting, colorSchemeSetting } = useColorScheme()
  const { colors } = useTheme()

  const handleColorSchemeSettingChange = useCallback(() => {
    const scheme = colorSchemeSetting === 'light' ? 'dark' : 'light'
    setColorSchemeSetting(scheme)
  }, [colorSchemeSetting, setColorSchemeSetting])

  const icon = colorSchemeSetting === 'light' ? 'moon-line' : 'sun-line'

  return (
    <MotiPressable
      onPress={handleColorSchemeSettingChange}
      style={styles.iconContainter}
      animate={({ hovered }) => {
        'worklet'

        return {
          scale: hovered ? 1.1 : 1,
          backgroundColor: hovered ? colors.bg.tertiary : 'transparent',
        }
      }}
    >
      <Icon name={icon} size={24} color="text.primary" />
    </MotiPressable>
  )
}

const styles = StyleSheet.create({
  iconContainter: {
    borderRadius: 8,
    padding: 8,
  },
})
