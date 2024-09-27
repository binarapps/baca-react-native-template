import * as Linking from 'expo-linking'

import { SocialButton } from '@/components'
import { RadioGroup } from '@/components/molecules/Field/RadioGroup'
import {
  Loader,
  Box,
  Text,
  Button,
  ScrollView,
  CheckboxButton,
  RenderComponentWithExample,
} from '@/design-system'
import { useBoolean, useCallback, useScreenOptions, useState, useTranslation } from '@/hooks'
import { noop, showInformationToast } from '@/utils'

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
    <RenderComponentWithExample
      Component={CheckboxButton}
      ComponentWithProps={
        <CheckboxButton
          onChange={setIsChecked.toggle}
          isSelected={isChecked}
          label={t('form.checkbox.remember_me')}
        />
      }
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
    <RenderComponentWithExample
      Component={RadioGroup}
      ComponentWithProps={
        <RadioGroup
          onSelectItem={setSelectedRadio}
          selectedItem={selectedRadio}
          isRequired
          name="age"
          items={agesMap}
          label={t('test_form.age')}
        />
      }
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
      <Box gap={6} mt={8}>
        <Text.LgRegular>Toast:</Text.LgRegular>
        <RenderComponentWithExample
          Component={Button.Primary}
          ComponentWithProps={
            <Button.Primary alignSelf="center" onPress={testNotification}>
              {t('components_screen.test_notification')}
            </Button.Primary>
          }
        />

        <Text.LgRegular>{t('components_screen.button_variants.header')}:</Text.LgRegular>
        <RenderComponentWithExample
          Component={Button.Primary}
          ComponentWithProps={
            <Button.Primary title={t('components_screen.button_variants.primary')} />
          }
        />

        <RenderComponentWithExample
          Component={Button.Primary}
          ComponentWithProps={
            <Button.Primary
              leftIconName="ancient-gate-fill"
              rightIconName="alarm-fill"
              title={t('components_screen.button_variants.with_icons')}
            />
          }
        />
        <RenderComponentWithExample
          Component={Button.PrimaryDestructive}
          ComponentWithProps={
            <Button.PrimaryDestructive
              title={t('components_screen.button_variants.primary_destructive')}
            />
          }
        />
        <RenderComponentWithExample
          Component={Button.SecondaryColor}
          ComponentWithProps={
            <Button.SecondaryColor title={t('components_screen.button_variants.secondary_color')} />
          }
        />
        <RenderComponentWithExample
          Component={Button.SecondaryGray}
          ComponentWithProps={
            <Button.SecondaryGray title={t('components_screen.button_variants.secondary_gray')} />
          }
        />

        <RenderComponentWithExample
          Component={Button.SecondaryDestructive}
          ComponentWithProps={
            <Button.SecondaryDestructive
              title={t('components_screen.button_variants.secondary_destructive')}
            />
          }
        />
        <RenderComponentWithExample
          Component={Button.TertiaryColor}
          ComponentWithProps={
            <Button.TertiaryColor title={t('components_screen.button_variants.tertiary_color')} />
          }
        />

        <RenderComponentWithExample
          Component={Button.TertiaryGray}
          ComponentWithProps={
            <Button.TertiaryGray title={t('components_screen.button_variants.tertiary_gray')} />
          }
        />
        <RenderComponentWithExample
          Component={Button.TertiaryDestructive}
          ComponentWithProps={
            <Button.TertiaryDestructive
              title={t('components_screen.button_variants.tertiary_destructive')}
            />
          }
        />
        <RenderComponentWithExample
          Component={Button.LinkColor}
          ComponentWithProps={
            <Button.LinkColor title={t('components_screen.button_variants.link_color')} />
          }
        />
        <RenderComponentWithExample
          Component={Button.LinkGray}
          ComponentWithProps={
            <Button.LinkGray title={t('components_screen.button_variants.link_gray')} />
          }
        />
        <RenderComponentWithExample
          Component={Button.LinkDestructive}
          ComponentWithProps={
            <Button.LinkDestructive
              title={t('components_screen.button_variants.link_destructive')}
            />
          }
        />
        <RenderComponentWithExample
          Component="Button"
          ComponentWithProps={
            <Button disabled>{t('components_screen.button_variants.disabled')}</Button>
          }
        />
        <RenderComponentWithExample
          Component="Button"
          ComponentWithProps={<Button loading size="lg" />}
        />

        <RenderComponentWithExample
          Component={SocialButton}
          ComponentWithProps={<SocialButton onPress={noop} type="google" />}
        />
        <RenderComponentWithExample
          Component={SocialButton}
          ComponentWithProps={<SocialButton onPress={noop} type="facebook" />}
        />
        <RenderComponentWithExample
          Component={SocialButton}
          ComponentWithProps={<SocialButton onPress={noop} type="apple" />}
        />

        <Box w="full" gap={6}>
          <TestCheckbox />
          <TextRadioButtons />
        </Box>

        <Text.LgRegular>{t('components_screen.loader_variants.header')}</Text.LgRegular>
        {loaderVariants?.map((loader) => (
          <Box flex={1} gap={6} key={loader.type}>
            <RenderComponentWithExample
              Component={Loader}
              ComponentWithProps={<Loader type={loader?.type} />}
            />
          </Box>
        ))}
      </Box>
    </ScrollView>
  )
}
