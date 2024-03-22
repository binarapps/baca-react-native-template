import { KeyboardAwareScrollView } from '@baca/components'
import { LandingHeader } from '@baca/components/LandingHeader'
import { darkLogo, lightLogo } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Button, Center, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { router } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

export const LandingScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const { colorScheme } = useColorScheme()

  const navigateToBlog = useCallback(() => {
    router.navigate('/blog')
  }, [])

  const navigateToBigForm = useCallback(() => {
    router.navigate('/big-form')
  }, [])

  return (
    <KeyboardAwareScrollView>
      <LandingHeader />
      <Center flex={1} px={4}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={colorScheme === 'light' ? lightLogo : darkLogo}
          style={styles.logo}
        />
        <Text.LgBold textAlign="center">{t('hello')}</Text.LgBold>
        <Text.MdRegular textAlign="center">{t('thanks')}</Text.MdRegular>
        <Text.MdRegular textAlign="center">{t('app_information')}</Text.MdRegular>
        <Button mt={4} onPress={navigateToBigForm}>
          {t('landing_screen.go_to_form')}
        </Button>
        <Button mt={4} onPress={navigateToBlog}>
          {t('landing_screen.go_to_blog')}
        </Button>
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: '100%',
  },
})
