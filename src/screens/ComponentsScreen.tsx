import { SocialButton } from '@baca/components'
import { RadioGroup } from '@baca/components/molecules/Field/RadioGroup'
import {
  Loader,
  Box,
  Text,
  Button,
  Center,
  ScrollView,
  Display,
  CheckboxButton,
} from '@baca/design-system'
import { useBoolean, useCallback, useScreenOptions, useState, useTranslation } from '@baca/hooks'
import { noop, showInformationToast } from '@baca/utils'
import * as Linking from 'expo-linking'

const loaderVariants = [
  {
    type: 'circle',
    headerText: 'components_screen.loader_variants.circle',
  },
  {
    type: 'bubbles',
    headerText: 'components_screen.loader_variants.bubbles',
  },
  {
    type: 'bricks',
    headerText: 'components_screen.loader_variants.bricks',
  },
  {
    type: 'disk',
    headerText: 'components_screen.loader_variants.disk',
  },
  {
    type: 'default',
    headerText: 'components_screen.loader_variants.default',
  },
] as const

const TestCheckbox = () => {
  const { t } = useTranslation()
  const [isChecked, setIsChecked] = useBoolean()

  return (
    <CheckboxButton
      onChange={setIsChecked.toggle}
      isChecked={isChecked}
      checkboxLablel={t('form.checkbox.remember_me')}
    />
  )
}

const AGES = ['18-30', '31-40', '41-50']
const agesMap = AGES.map((age) => ({
  label: age,
  value: age,
}))

const TextRadioButtons = () => {
  const { t } = useTranslation()
  const [selectedRadio, setSelectedRadio] = useState<string | undefined>()

  return (
    <RadioGroup
      onSelectItem={setSelectedRadio}
      selectedItem={selectedRadio}
      isRequired
      name="age"
      items={agesMap}
      label={t('test_form.age')}
    />
  )
}

export const ComponentsScreen = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.components'),
  })

  const testNotification = useCallback(() => {
    showInformationToast({
      title: t('components_screen.notification.title'),
      description: t('components_screen.notification.description'),
      onPress: () => {
        Linking.openURL('https://thewidlarzgroup.github.io/react-native-notificated/')
      },
    })
  }, [t])

  return (
    <ScrollView flexGrow={1} p={4}>
      <Button.Primary alignSelf="center" onPress={testNotification}>
        {t('components_screen.test_notification')}
      </Button.Primary>
      <Box alignItems="center" gap={6} mt={8}>
        <Text.LgRegular>{t('components_screen.button_variants.header')}:</Text.LgRegular>
        <Button.Primary title={t('components_screen.button_variants.primary')} />
        <Button.Primary
          leftIconName="ancient-gate-fill"
          rightIconName="alarm-fill"
          title={t('components_screen.button_variants.with_icons')}
        />
        <Button.PrimaryDestructive
          title={t('components_screen.button_variants.primary_destructive')}
        />
        <Button.SecondaryColor title={t('components_screen.button_variants.secondary_color')} />
        <Button.SecondaryGray title={t('components_screen.button_variants.secondary_gray')} />
        <Button.SecondaryDestructive
          title={t('components_screen.button_variants.secondary_destructive')}
        />
        <Button.TertiaryColor title={t('components_screen.button_variants.tertiary_color')} />
        <Button.TertiaryGray title={t('components_screen.button_variants.tertiary_gray')} />
        <Button.TertiaryDestructive
          title={t('components_screen.button_variants.tertiary_destructive')}
        />
        <Button.LinkColor title={t('components_screen.button_variants.link_color')} />
        <Button.LinkGray title={t('components_screen.button_variants.link_gray')} />
        <Button.LinkDestructive title={t('components_screen.button_variants.link_destructive')} />
        <Button disabled>{t('components_screen.button_variants.disabled')}</Button>
        <SocialButton onPress={noop} type="google" />
        <SocialButton onPress={noop} type="facebook" />
        <SocialButton onPress={noop} type="apple" />
        <Box w="full" gap={6}>
          <TestCheckbox />
          <TextRadioButtons />
        </Box>
        <Button loading size="lg" />
        <Text.LgRegular>{t('components_screen.loader_variants.header')}</Text.LgRegular>
        {loaderVariants?.map((loader) => (
          <Box flex={1} gap={6} key={loader.type}>
            <Text.SmRegular>{t(loader?.headerText)}</Text.SmRegular>
            <Center>
              <Loader type={loader?.type} />
            </Center>
          </Box>
        ))}
        <Display.LgBold>TEST</Display.LgBold>
      </Box>
    </ScrollView>
  )
}
