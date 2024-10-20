import { useRouter } from 'expo-router'

import { Button, Display, ScrollView } from '@/design-system'
import { useCallback, useTranslation, useScreenOptions } from '@/hooks'

export const ExamplesScreen = () => {
  const { push } = useRouter()
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.examples'),
  })

  // App logic
  const goToApplicationInfo = useCallback(() => push('/application-info'), [push])
  const goToPushNotificationsHelpers = useCallback(
    () => push('/example/push-notifications-helpers'),
    [push]
  )
  const goToUserSession = useCallback(() => push('/example/user-session'), [push])

  // UI Examples
  const goToColors = useCallback(() => push('/colors'), [push])
  const goToComponents = useCallback(() => push('/components'), [push])
  const goToTypography = useCallback(() => push('/typography'), [push])
  const goToStylesBenchmark = useCallback(() => push('/style-benchmark'), [push])
  const goToTestForm = useCallback(() => push('/test-form'), [push])

  // Others
  const goToHomeStackDetails = useCallback(() => push('/home/details'), [push])
  const goToCityListScreen_EXAMPLE = useCallback(() => push('/example/data-from-be'), [push])

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
      <Button onPress={goToStylesBenchmark}>{t('examples_screen.go_to_style_benchmark')}</Button>
      <Button onPress={goToTestForm}>{t('examples_screen.go_to_screen_test_form')}</Button>

      <Display.SmBold>Others</Display.SmBold>
      <Button onPress={goToHomeStackDetails}>
        {t('examples_screen.go_to_home_stack_details')}
      </Button>
      <Button onPress={goToCityListScreen_EXAMPLE}>
        {t('examples_screen.go_to_screen_with_BEdata')}
      </Button>
    </ScrollView>
  )
}
