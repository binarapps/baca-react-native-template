import { Button, ScrollView } from '@baca/design-system'
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
  const goToUserSession = useCallback(() => push('/example/user-session'), [push])

  const goToHomeStackDetails = useCallback(() => push('/home/details'), [push])

  return (
    <ScrollView p={4}>
      <Button mb={2} onPress={goToApplicationInfo}>
        {t('examples_screen.go_to_application_info')}
      </Button>
      <Button mb={2} onPress={goToColors}>
        {t('examples_screen.go_to_colors')}
      </Button>
      <Button mb={2} onPress={goToComponents}>
        {t('examples_screen.go_to_components')}
      </Button>
      <Button mb={2} onPress={goToTypography}>
        {t('examples_screen.go_to_typography')}
      </Button>
      <Button mb={2} onPress={goToHomeStackDetails}>
        {t('examples_screen.go_to_home_stack_details')}
      </Button>
      <Button mb={2} onPress={goToCityListScreen_EXAMPLE}>
        {t('examples_screen.go_to_screen_with_BEdata')}
      </Button>
      <Button mb={2} onPress={goToTestForm}>
        {t('examples_screen.go_to_screen_test_form')}
      </Button>
      <Button mb={2} onPress={goToUserSession}>
        {t('examples_screen.go_to_user_session')}
      </Button>
    </ScrollView>
  )
}
