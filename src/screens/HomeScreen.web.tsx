import { Button, Center, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { View, Linking, StyleSheet } from 'react-native'

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
      <Text.XxlBold textAlign="center">{t('home_header_title')}</Text.XxlBold>
      <Text.LgRegular textAlign="center">{t('home_header_subtitle')}</Text.LgRegular>

      <View style={styles.buttonsContainer}>
        <Button
          m={3}
          h={12}
          minWidth={160}
          maxWidth={160}
          onPress={() => openLink('https://baca-docs.vercel.app/docs/overview')}
        >
          <Text.MdBold>Read docs</Text.MdBold>
        </Button>
        <Button.SecondaryColor
          m={3}
          h={12}
          minWidth={160}
          maxWidth={160}
          onPress={() => openLink('https://binarapps.online/sign-in')}
        >
          <Text.MdBold>Try it</Text.MdBold>
        </Button.SecondaryColor>
      </View>
    </Center>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
})
