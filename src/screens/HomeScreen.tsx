import { Button, Center, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { router } from 'expo-router'

export const HomeScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const navigateToDetails = useCallback(() => {
    router.navigate({
      pathname: 'home/details',
      params: { user: 'example@example.com' },
    })
  }, [])
  const navigateToBlog = useCallback(() => {
    router.navigate('/blog')
  }, [])

  const navigateToBigForm = useCallback(() => {
    router.navigate('/big-form')
  }, [])

  return (
    <Center flex={1} px={4}>
      <Text.XxlBold textAlign="center">{t('home_header_title')}</Text.XxlBold>
      <Text.LgRegular textAlign="center">{t('home_header_subtitle')}</Text.LgRegular>
      <Button mt={4} onPress={navigateToDetails}>
        {t('home_screen.details')}
      </Button>
      <Button mt={4} onPress={navigateToBigForm}>
        {t('landing_screen.go_to_form')}
      </Button>
      <Button mt={4} onPress={navigateToBlog}>
        {t('landing_screen.go_to_blog')}
      </Button>
    </Center>
  )
}
