import { KeyboardAwareScrollView, LandingHeader } from '@baca/components'
import { BACA_APP_URL, BACA_DOCS_URL } from '@baca/constants'
import { Button, Center, Text, Box } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import { draftImages } from '@baca/screens'
import { useState, useEffect, useMemo } from 'react'
import { ImageSourcePropType, Linking, Image, Dimensions, StyleSheet } from 'react-native'

export const LandingScreen = () => {
  const { t } = useTranslation()
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => setScreenWidth(window.width)
    const subscription = Dimensions.addEventListener('change', onChange)
    return () => subscription?.remove()
  }, [])

  const imageWidth = useMemo(() => {
    if (screenWidth >= 1100) {
      return '25%'
    } else if (screenWidth >= 767) {
      return '50%'
    } else {
      return '100%'
    }
  }, [screenWidth])

  const paddingBetweenImages = useMemo(() => {
    if (screenWidth >= 1100) {
      return 2
    } else if (screenWidth >= 767) {
      return 8
    } else if (screenWidth <= 400) {
      return 4
    } else {
      return 16
    }
  }, [screenWidth])

  const openLink = useCallback((url: string) => Linking.openURL(url), [])

  const renderItem = (item: ImageSourcePropType, index: number) => (
    <Box key={index} width={imageWidth} px={paddingBetweenImages} pb={paddingBetweenImages}>
      <Box style={{ aspectRatio: 9 / 16 }} height="100%" borderRadius={16} bg="bg.active">
        <Image source={item} resizeMode="contain" style={styles.imageSize} />
      </Box>
    </Box>
  )

  useScreenOptions({
    title: t('navigation.screen_titles.home'),
  })

  return (
    <KeyboardAwareScrollView>
      <LandingHeader />
      <Center bg="bg.brand.section" flex={1} px={4}>
        <Text.XxlBold fontSize={40} mt={20} color="text.white" textAlign="center">
          {t('home_screen.header_title')}
        </Text.XxlBold>
        <Text.LgRegular color="text.white" textAlign="center">
          {t('home_screen.header_subtitle')}
        </Text.LgRegular>

        <Box alignItems="center" flexDirection="row" flexWrap="wrap" justifyContent="center" mt={4}>
          <Button m={3} h={12} minWidth={160} onPress={() => openLink(BACA_DOCS_URL)}>
            {t('home_screen.read_docs')}
          </Button>
          <Button.SecondaryColor m={3} h={12} minWidth={160} onPress={() => openLink(BACA_APP_URL)}>
            {t('home_screen.try_it')}
          </Button.SecondaryColor>
        </Box>

        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          mt={4}
          width={screenWidth - 16}
          px={`${16}px`}
        >
          {draftImages.map(renderItem)}
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  imageSize: {
    borderRadius: 16,
    height: '100%',
    width: '100%',
  },
})
