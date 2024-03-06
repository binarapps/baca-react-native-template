import { Button, Center, Text } from '@baca/design-system'
import { useCallback, useTranslation } from '@baca/hooks'

// @ts-expect-error: it's a template and will be removed
export const _NAME_Screen = (props: _NAME_ScreenProps): JSX.Element => {
  const {
    navigation: { navigate },
  } = props
  const { t } = useTranslation()

  const navigateToDetails = useCallback(() => {
    navigate('Home')
  }, [navigate])

  return (
    <Center flex={1}>
      <Text textAlign="center">_NAME_</Text>
      <Text textAlign="center">{t('hello')}</Text>
      <Button mt={4} onPress={navigateToDetails}>
        {t('home_screen.details')}
      </Button>
    </Center>
  )
}
