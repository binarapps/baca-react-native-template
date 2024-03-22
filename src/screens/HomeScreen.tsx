import { useArticlesControllerFindAll } from '@baca/api/query/articles/articles'
import { darkLogo, lightLogo } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Button, Center, Spacer, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { router } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

export const HomeScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const { colorScheme } = useColorScheme()

  useArticlesControllerFindAll({ page: 1, pageSize: 10 })

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
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        source={colorScheme === 'light' ? lightLogo : darkLogo}
        style={styles.logo}
      />
      <Spacer y={4} />
      <Text.MdBold textAlign="center">{t('hello')}</Text.MdBold>
      <Text.MdRegular textAlign="center">{t('thanks')}</Text.MdRegular>
      <Text.MdRegular textAlign="center">{t('app_information')}</Text.MdRegular>
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

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: '100%',
  },
})
