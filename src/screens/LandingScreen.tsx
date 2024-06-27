import { KeyboardAwareScrollView, LandingHeader } from '@baca/components'
import { BACA_APP_URL, BACA_DOCS_URL } from '@baca/constants'
import { Button, Center, Text, Box } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { draftImages } from '@baca/screens'
import { useState, useEffect } from 'react'
import { ImageSourcePropType, Linking, Image, Dimensions, StyleSheet } from 'react-native'

export const LandingScreen = () => {
  const { t } = useTranslation()
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => setScreenWidth(window.width)
    const subscription = Dimensions.addEventListener('change', onChange)
    return () => subscription?.remove()
  }, [])

  let numColumns
  if (screenWidth >= 1100) {
    numColumns = 4
  } else if (screenWidth <= 767) {
    numColumns = 2
  } else {
    numColumns = 4
  }

  const imageSize = screenWidth / numColumns - 16

  const openLink = useCallback((url: string) => Linking.openURL(url), [])

  const renderItem = (item: ImageSourcePropType, index: number) => (
    <Box key={index} height={imageSize} width={imageSize} style={styles.imagesContainer}>
      <Image source={item} resizeMode="contain" style={styles.imageSize} />
    </Box>
  )

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  return (
    <KeyboardAwareScrollView>
      <LandingHeader />
      <Center flex={1} px={4}>
        <Text.XxlBold mt={20} textAlign="center">
          {t('home_screen.header_title')}
        </Text.XxlBold>
        <Text.LgRegular textAlign="center">{t('home_screen.header_subtitle')}</Text.LgRegular>

        <Box alignItems="center" flexDirection="row" flexWrap="wrap" justifyContent="center" mt={4}>
          <Button
            m={3}
            h={12}
            minWidth={160}
            maxWidth={160}
            onPress={() => openLink(BACA_DOCS_URL)}
          >
            {t('home_screen.read_docs')}
          </Button>
          <Button.SecondaryColor
            m={3}
            h={12}
            minWidth={160}
            maxWidth={160}
            onPress={() => openLink(BACA_APP_URL)}
          >
            {t('home_screen.try_it')}
          </Button.SecondaryColor>
        </Box>

        <Box flexDirection="row" flexWrap="wrap" justifyContent="center" mt={4}>
          {draftImages.map(renderItem)}
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  imageSize: {
    height: '100%',
    width: '100%',
  },
  imagesContainer: {
    padding: 6,
  },
})
