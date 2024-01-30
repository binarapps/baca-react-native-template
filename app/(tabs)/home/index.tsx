import { useRouter } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

import { Button, Center, Text } from '~components/atoms'
import { darkLogo, lightLogo } from '~constants'
import { useColorScheme } from '~contexts'
import { useScreenOptions, useTranslation } from '~hooks'

export default function HomeScreen(): JSX.Element {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const { colorScheme } = useColorScheme()
  const router = useRouter()

  const navigateToDetails = () => {
    router.push('/home/details')
  }

  return (
    <Center flex={1} px={4}>
      <Image
        source={colorScheme === 'light' ? lightLogo : darkLogo}
        style={styles.logo}
        resizeMode="contain"
        resizeMethod="resize"
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
