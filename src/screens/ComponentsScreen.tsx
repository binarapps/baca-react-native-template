import { Loader, Box, Text, Button, Center, ScrollView, Display } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { showInformationToast } from '@baca/utils'
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
      <Box alignItems="center">
        <Text.LgRegular mt={8} mb={4}>
          {t('components_screen.typography.label')}
        </Text.LgRegular>
        <Text.LgRegular mt={8} mb={4}>
          {t('components_screen.button_variants.header')}
        </Text.LgRegular>
        <Button.Primary title={t('components_screen.button_variants.primary')} />
        <Button.Primary
          mt={4}
          leftIconName="ancient-gate-fill"
          rightIconName="alarm-fill"
          title={t('components_screen.button_variants.with_icons')}
        />
        <Button.PrimaryDestructive
          mt={4}
          title={t('components_screen.button_variants.primary_destructive')}
        />
        <Button.SecondaryColor
          mt={4}
          title={t('components_screen.button_variants.secondary_color')}
        />
        <Button.SecondaryGray
          mt={4}
          title={t('components_screen.button_variants.secondary_gray')}
        />
        <Button.SecondaryDestructive
          mt={4}
          title={t('components_screen.button_variants.secondary_destructive')}
        />
        <Button.TertiaryColor
          mt={4}
          title={t('components_screen.button_variants.tertiary_color')}
        />
        <Button.TertiaryGray mt={4} title={t('components_screen.button_variants.tertiary_gray')} />
        <Button.TertiaryDestructive
          mt={4}
          title={t('components_screen.button_variants.tertiary_destructive')}
        />
        <Button.LinkColor mt={4} title={t('components_screen.button_variants.link_color')} />
        <Button.LinkGray mt={4} title={t('components_screen.button_variants.link_gray')} />
        <Button.LinkDestructive
          mt={4}
          title={t('components_screen.button_variants.link_destructive')}
        />
        <Button mt={4} disabled>
          {t('components_screen.button_variants.disabled')}
        </Button>
        <Button mt={4} loading size="lg" />
        <Text.LgRegular mt={8} mb={4}>
          {t('components_screen.loader_variants.header')}
        </Text.LgRegular>
        {loaderVariants?.map((loader) => (
          <Box flex={1} key={loader.type}>
            <Text.SmRegular my={4}>{t(loader?.headerText)}</Text.SmRegular>
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
