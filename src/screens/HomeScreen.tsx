import { useRouter } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

import { Button, Center, Text } from '~components'
import { darkLogo, lightLogo } from '~constants'
import { useColorScheme } from '~contexts'
import { useCallback, useScreenOptions, useTranslation } from '~hooks'

export const HomeScreen = () => {
  const { push } = useRouter()
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const { colorScheme } = useColorScheme()

  const navigateToDetails = useCallback(() => {
    push('/home/details')
  }, [push])

  return (
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
    </Center>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: '100%',
  },
})
