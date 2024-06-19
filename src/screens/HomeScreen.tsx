import { Box, Button, Center, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { Linking } from 'react-native'

export const HomeScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  const openLink = useCallback((url: string) => {
    Linking.openURL(url)
  }, [])

  return (
    <Center flex={1} px={4}>
      <Text.XxlBold textAlign="center">{t('home_screen.header_title')}</Text.XxlBold>
      <Text.LgRegular textAlign="center">{t('home_screen.header_subtitle')}</Text.LgRegular>

      <Box
        alignItems={'center'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        mt={4}
      >
        <Button
          h={12}
          m={3}
          maxWidth={160}
          minWidth={160}
          onPress={() => openLink('https://baca-docs.vercel.app/docs/overview')}
        >
          {t('home_screen.read_docs')}
        </Button>
        <Button.SecondaryColor
          h={12}
          m={3}
          maxWidth={160}
          minWidth={160}
          onPress={() => openLink('https://binarapps.online/sign-in')}
        >
          {t('home_screen.try_it')}
        </Button.SecondaryColor>
      </Box>
    </Center>
  )
}
