import { darkLogoFull, lightLogoFull } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Box, Button, Icon, Pressable } from '@baca/design-system'
import { useTranslation } from '@baca/hooks'
import { TabColorsStrings } from '@baca/navigation/tabNavigator/navigation-config'
import { isSignedInAtom } from '@baca/store/auth'
import { useRouter } from 'expo-router'
import { useAtomValue } from 'jotai'
import { Image, StyleSheet, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export function LandingHeader() {
  const { colorScheme } = useColorScheme()
  const { top } = useSafeAreaInsets()
  const { t } = useTranslation()
  const { push, canGoBack, back } = useRouter()

  const isSignedIn = useAtomValue(isSignedInAtom)

  const navigateToLogin = () => push('/sign-in')

  const height = 60 + top
  return (
    <View
      style={[
        { height, paddingTop: top },
        jsStyles.appHeader,
        Platform.select({ default: {}, web: { display: 'flex' } }),
      ]}
    >
      {canGoBack() ? (
        <Pressable onPress={back}>
          <Icon name="arrow-left-line" size={20} />
        </Pressable>
      ) : (
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={colorScheme === 'light' ? lightLogoFull : darkLogoFull}
          style={jsStyles.logoWide}
        />
      )}
      {!isSignedIn ? (
        <Button onPress={navigateToLogin}>{t('landing_screen.login_cta')}</Button>
      ) : (
        <Box />
      )}
    </View>
  )
}

const jsStyles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    borderBottomColor: TabColorsStrings.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
  logoWide: { height: 60, width: 150 },
})
