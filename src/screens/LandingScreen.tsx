import { KeyboardAwareScrollView, LandingHeader } from '@baca/components'
import { BACA_APP_URL, BACA_DOCS_URL } from '@baca/constants'
import { Button, Center, Text, Box, ScrollView } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation, useViewportDimensions } from '@baca/hooks'
import { draftImages } from '@baca/screens'
import { ImageSourcePropType, Linking, Image, StyleSheet } from 'react-native'

export const LandingScreen = () => {
  const { t } = useTranslation()
  const { viewportWidth, viewportHeight } = useViewportDimensions()

  const openLink = useCallback((url: string) => Linking.openURL(url), [])

  const renderItem = (item: ImageSourcePropType, index: number) => (
    <Box key={index} height={viewportHeight * 0.6} width={viewportWidth * 0.6}>
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

        <ScrollView
          height={viewportHeight * 0.6}
          horizontal
          mt={8}
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          width={viewportWidth * 0.6}
        >
          {draftImages.map(renderItem)}
        </ScrollView>
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  imageSize: {
    height: '100%',
    width: '100%',
  },
})
