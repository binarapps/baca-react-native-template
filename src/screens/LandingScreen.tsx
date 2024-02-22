import { router } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

import { Button, Center, Text } from '~components'
import { LandingHeader } from '~components/LandingHeader'
import { darkLogo, lightLogo } from '~constants'
import { useColorScheme } from '~contexts'
import { useCallback, useScreenOptions, useTranslation } from '~hooks'

export const LandingScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const { colorScheme } = useColorScheme()

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
    <>
      <LandingHeader />
      <Center flex={1} px={4}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={colorScheme === 'light' ? lightLogo : darkLogo}
          style={styles.logo}
        />
        <Text.H3Bold textAlign="center">{t('hello')}</Text.H3Bold>
        <Text.Caption textAlign="center">{t('thanks')}</Text.Caption>
        <Text.Caption textAlign="center">{t('app_information')}</Text.Caption>
        <Button mt={4} onPress={navigateToDetails}>
          {t('home_screen.details')}
        </Button>
        <Button mt={4} onPress={navigateToBigForm}>
          Form - full screen
        </Button>
        <Button mt={4} onPress={navigateToBlog}>
          Blog - full screen
        </Button>
      </Center>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: '100%',
  },
})
