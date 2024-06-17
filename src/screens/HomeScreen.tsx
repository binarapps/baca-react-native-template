import { Button, Center, Text } from '@baca/design-system'
import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
import React from 'react'
import { View, Linking, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'

import iphoneSettingsDraftDark from './iphone_settings_draft_dark.png'
import iphoneSettingsDraftLight from './iphone_settings_draft_light.png'
import iphoneSignupDraftDark from './iphone_signup_draft_dark.png'
import iphoneSignupDraftLight from './iphone_signup_draft_light.png'

const imageSources = [
  iphoneSettingsDraftDark,
  iphoneSettingsDraftLight,
  iphoneSignupDraftDark,
  iphoneSignupDraftLight,
]

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
          onPress={() => openLink('/docs/overview')}
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
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.sliderContainer}
        centerContent
        decelerationRate={0.99}
      >
        {imageSources.map((source, index) => (
          <Image key={index} source={source} style={styles.sliderImage} />
        ))}
      </ScrollView>
    </Center>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  sliderContainer: {
    gap: 16,
    marginTop: 16,
    width: '100%',
  },
  sliderImage: {
    height: '100%',
    resizeMode: 'contain',
    width,
  },
})

export default HomeScreen

// import { Button, Center, Text } from '@baca/design-system'
// import { useCallback, useScreenOptions, useTranslation } from '@baca/hooks'
// import { View, Linking, StyleSheet } from 'react-native'

// export const HomeScreen = () => {
//   const { t } = useTranslation()

//   useScreenOptions({
//     title: t('navigation.screen_titles.home'),
//   })

//   const openLink = useCallback((url: string) => {
//     Linking.openURL(url)
//   }, [])

//   return (
//     <Center flex={1} px={4}>
//       <Text.XxlBold textAlign="center">{t('home_header_title')}</Text.XxlBold>
//       <Text.LgRegular textAlign="center">{t('home_header_subtitle')}</Text.LgRegular>

//       <View style={styles.buttonsContainer}>
//         <Button
//           m={3}
//           h={12}
//           minWidth={160}
//           maxWidth={160}
//           onPress={() => openLink('/docs/overview')}
//         >
//           <Text.MdBold>Read docs</Text.MdBold>
//         </Button>
//         <Button.SecondaryColor
//           m={3}
//           h={12}
//           minWidth={160}
//           maxWidth={160}
//           onPress={() => openLink('https://binarapps.online/sign-in')}
//         >
//           <Text.MdBold>Try it</Text.MdBold>
//         </Button.SecondaryColor>
//       </View>
//     </Center>
//   )
// }

// const styles = StyleSheet.create({
//   buttonsContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
// })
