import { Field, Version } from '@/components'
import { colorSchemesList } from '@/constants'
import { useColorScheme } from '@/contexts'
import { Spacer, Button, ScrollView, Box, Row, Icon, Text } from '@/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@/hooks'
import languages from '@/i18n/languages.json'
import { signOut } from '@/store/auth'
import { IconNames } from '@/types'
import { noop } from '@/utils'

const ListItemContent = ({
  label,
  value,
  iconName,
  showBorder,
}: {
  label: string
  value: string
  iconName: IconNames
  showBorder?: boolean
}) => {
  return (
    <Row alignItems="center" gap={2}>
      <Box p={1} bg="bg.brand.solid" borderRadius={99}>
        <Icon name={iconName} size={20} color="text.white" />
      </Box>
      <Row
        py={4}
        alignItems="center"
        flex={1}
        borderBottomWidth={showBorder ? 1 : 0}
        borderColor="bg.quaternary"
        gap={2}
      >
        <Text.SmBold>{label}</Text.SmBold>
        <Box flex={1} />
        <Text.SmMedium>{value}</Text.SmMedium>
        <Icon name="arrow-right-s-line" size={24} />
      </Row>
    </Row>
  )
}

export const LanguageSettings = (): JSX.Element => {
  const { i18n } = useTranslation()

  const language = i18n?.language?.slice?.(0, 2).toUpperCase() as keyof typeof languages

  const languagesToRender = Object.entries(languages).map(([key, languageData]) => ({
    label: `${languageData.emoji} ${languageData.language}`,
    value: key,
  }))

  const handleItemPress = useCallback(
    (lng: string[]) => {
      i18n.changeLanguage(lng[0].toLowerCase())
    },
    [i18n]
  )

  return (
    <Field.Select
      onSelectItem={handleItemPress}
      maxSelectedItems={1}
      items={languagesToRender}
      selectedItems={[language]}
      label="Wybierz język"
    >
      {(props) => (
        <ListItemContent label="Wybierz język" iconName="global-line" value={props.value} />
      )}
    </Field.Select>
  )
}

const ColorSchemeSettings = () => {
  const { setColorSchemeSetting, colorSchemeSetting } = useColorScheme()

  const handleColorSchemeSettingChange = useCallback(
    (scheme: (typeof colorSchemeSetting)[]) => {
      setColorSchemeSetting(scheme[0])
    },
    [setColorSchemeSetting]
  )

  const colorSchemesListToRender = colorSchemesList.map((scheme) => ({
    label: scheme,
    value: scheme,
  }))

  return (
    <Field.Select
      onSelectItem={handleColorSchemeSettingChange}
      maxSelectedItems={1}
      items={colorSchemesListToRender}
      selectedItems={[colorSchemeSetting]}
      label="Wybierz schemat kolorów"
      mb="0px"
    >
      {(props) => (
        <ListItemContent
          label="Wybierz schemat kolorów"
          iconName="palette-line"
          showBorder
          value={props.value}
        />
      )}
    </Field.Select>
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
        <Box bg="bg.tertiary" px={4} borderRadius={12}>
          <Text.SmMedium mt={4} mb={2}>
            Settings
          </Text.SmMedium>
          <ColorSchemeSettings />
          <LanguageSettings />
        </Box>

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
