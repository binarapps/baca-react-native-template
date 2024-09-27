import { Field, Version } from '@/components'
import { colorSchemesList } from '@/constants'
import { useColorScheme } from '@/contexts'
import { Spacer, Button, ScrollView, Box } from '@/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@/hooks'
import languages from '@/i18n/languages.json'
import { signOut } from '@/store/auth'
import { noop } from '@/utils'

export const LanguageSettings = (): JSX.Element => {
  const { i18n } = useTranslation()

  const language = i18n?.language?.slice?.(0, 2).toUpperCase() as keyof typeof languages

  const languagesToRender = Object.entries(languages).map(([key, languageData]) => ({
    label: `${languageData.emoji} ${languageData.language}`,
    value: key,
  }))

  const handleItemPress = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng.toLowerCase())
    },
    [i18n]
  )

  return (
    <Field.RadioGroup
      onSelectItem={handleItemPress}
      items={languagesToRender}
      label="Wybierz język"
      size="md"
      selectedItem={language}
    />
  )
}

const ColorSchemeSettings = () => {
  const { setColorSchemeSetting, colorSchemeSetting } = useColorScheme()

  const handleColorSchemeSettingChange = useCallback(
    (scheme: typeof colorSchemeSetting) => {
      setColorSchemeSetting(scheme)
    },
    [setColorSchemeSetting]
  )

  const colorSchemesListToRender = colorSchemesList.map((scheme) => ({
    label: scheme,
    value: scheme,
  }))

  return (
    <Field.RadioGroup
      onSelectItem={handleColorSchemeSettingChange}
      items={colorSchemesListToRender}
      label="Wybierz schemat kolorów"
      size="md"
      selectedItem={colorSchemeSetting}
    />
  )
}

export const SettingsScreen = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.settings'),
  })

  return (
    <ScrollView flexGrow={1} mt={4}>
      <Box flexGrow={1} px={4}>
        <ColorSchemeSettings />

        <Spacer y={6} />

        <LanguageSettings />

        <Box flexGrow={1} />

        <Button.SecondaryColor mt={8} size="lg" onPress={signOut} testID="settings:logout">
          {t('settings_screen.sign_out')}
        </Button.SecondaryColor>
        <Spacer y={4} />
        <Version onPress={noop} />
        <Spacer y={8} />
      </Box>
    </ScrollView>
  )
}
