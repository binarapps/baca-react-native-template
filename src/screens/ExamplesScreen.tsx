import { Button, Display, ScrollView } from '@baca/design-system'
import { useCallback, useTranslation, useScreenOptions } from '@baca/hooks'
import { useRouter } from 'expo-router'

export const ExamplesScreen = () => {
  const { push } = useRouter()
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.examples'),
  })

  const goToApplicationInfo = useCallback(() => push('/application-info'), [push])
  const goToColors = useCallback(() => push('/example/colors'), [push])
  const goToComponents = useCallback(() => push('/example/components'), [push])
  const goToTypography = useCallback(() => push('/example/typography'), [push])
  const goToCityListScreen_EXAMPLE = useCallback(() => push('/example/data-from-be'), [push])
  const goToTestForm = useCallback(() => push('/example/test-form'), [push])
  const goToPushNotificationsHelpers = useCallback(
    () => push('/example/push-notifications-helpers'),
    [push]
  )
  const goToUserSession = useCallback(() => push('/example/user-session'), [push])

  const goToHomeStackDetails = useCallback(() => push('/home/details'), [push])

  return (
    <ScrollView p={4} gap={4}>
      <Display.SmBold>App logic</Display.SmBold>
      <Button onPress={goToApplicationInfo}>{t('examples_screen.go_to_application_info')}</Button>
      <Button onPress={goToPushNotificationsHelpers}>Go to push notifications helpers</Button>
      <Button onPress={goToUserSession}>{t('examples_screen.go_to_user_session')}</Button>

      <Display.SmBold>UI Examples</Display.SmBold>
      <Button onPress={goToColors}>{t('examples_screen.go_to_colors')}</Button>
      <Button onPress={goToComponents}>{t('examples_screen.go_to_components')}</Button>
      <Button onPress={goToTypography}>{t('examples_screen.go_to_typography')}</Button>

      <Display.SmBold>Navigation</Display.SmBold>
      <Button onPress={goToHomeStackDetails}>
        {t('examples_screen.go_to_home_stack_details')}
      </Button>
      <Button onPress={goToCityListScreen_EXAMPLE}>
        {t('examples_screen.go_to_screen_with_BEdata')}
      </Button>
      <Button onPress={goToTestForm}>{t('examples_screen.go_to_screen_test_form')}</Button>
    </ScrollView>
  )
}
