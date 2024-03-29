import { Version } from '@baca/components'
import { colorSchemesList } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Spacer, Button, Center, Text, ScrollView } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { signOut } from '@baca/store/auth'
import { noop } from '@baca/utils'

export const SettingsScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const { setColorSchemeSetting, colorSchemeSetting } = useColorScheme()

  useScreenOptions({
    title: t('navigation.screen_titles.settings'),
  })

  const handleColorSchemeSettingChange = useCallback(
    (scheme: typeof colorSchemeSetting) => () => {
      setColorSchemeSetting(scheme)
    },
    [setColorSchemeSetting]
  )

  return (
    <ScrollView mt={4}>
      <Center flex={1}>
        <Text bold mb={2}>
          {t('settings_screen.current_theme', { theme: colorSchemeSetting })}
        </Text>
        {colorSchemesList.map((scheme) => {
          const isSelected = scheme === colorSchemeSetting

          return (
            <Button size="lg" key={scheme} mb={2} onPress={handleColorSchemeSettingChange(scheme)}>
              {scheme + (isSelected ? ' - selected' : '')}
            </Button>
          )
        })}

        <Button.SecondaryColor mt={8} size="lg" onPress={signOut}>
          {t('settings_screen.sign_out')}
        </Button.SecondaryColor>
        <Spacer y={10} />
        <Version onPress={noop} />
      </Center>
    </ScrollView>
  )
}
