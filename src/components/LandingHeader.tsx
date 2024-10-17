import { useRouter } from 'expo-router'
import { useAtomValue } from 'jotai'
import { StyleSheet, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CompanyLogo } from './CompanyLogo'
import { ThemeSwitcherButton } from './ThemeSwitcherButton'

import { useColorScheme } from '@/contexts'
import { Box, Button, Icon, Pressable, Row, Spacer, Touchable } from '@/design-system'
import { useFullScreenModal } from '@/design-system/modals/useFullScreenModal'
import { useCallback, useMemo, useTheme, useTranslation } from '@/hooks'
import { useUniversalWidth } from '@/navigation/tabNavigator/hooks'
import { isSignedInAtom } from '@/store/auth'

export function LandingHeader() {
  const { colorScheme } = useColorScheme()
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()
  const { t } = useTranslation()
  const { push, canGoBack, back } = useRouter()

  const height = 60 + top

  const isDesktop = useUniversalWidth(768)

  const isSignedIn = useAtomValue(isSignedInAtom)

  const navigateToLogin = useCallback(() => push('/sign-in'), [push])
  const navigateToSignUp = useCallback(() => push('/sign-up'), [push])

  const { closeFullScreenModal, modalComponentRenderFunction, presentFullScreenModal } =
    useFullScreenModal()

  const renderLeftMenu = useMemo(() => {
    return canGoBack() ? (
      <Pressable onPress={back}>
        <Icon name="arrow-left-line" size={20} />
      </Pressable>
    ) : (
      <CompanyLogo height={60} width={150} />
    )
  }, [back, canGoBack, colorScheme])

  const fullScreenModal = modalComponentRenderFunction(
    <Box flex={1}>
      <View
        style={[
          { borderBottomColor: colors.border.secondary, height, paddingTop: top },
          jsStyles.appHeader,
          Platform.select({ default: {}, web: { display: 'flex' } }),
        ]}
      >
        {renderLeftMenu}
        <Touchable onPress={closeFullScreenModal}>
          <Icon name="close-line" size={24} color="text.brand.primary" />
        </Touchable>
        <Box />
      </View>
      <Box flex={1} />
      <Box p={4} w="full">
        <Button onPress={navigateToLogin}>{t('landing_screen.login_cta')}</Button>
        <Spacer y="4" />
        <Button onPress={navigateToSignUp}>{t('landing_screen.sign_up')}</Button>
      </Box>
    </Box>
  )

  const renderRightMenu = useMemo(() => {
    if (isSignedIn) {
      return <ThemeSwitcherButton />
    }

    if (isDesktop) {
      return (
        <Row>
          <Button onPress={navigateToLogin}>{t('landing_screen.login_cta')}</Button>
          <Spacer x="4" />
          <Button onPress={navigateToSignUp}>{t('landing_screen.sign_up')}</Button>
          <Spacer x="4" />
          <ThemeSwitcherButton />
        </Row>
      )
    }

    return (
      <Touchable onPress={presentFullScreenModal}>
        <Icon name="menu-2-line" size={24} color="text.brand.primary" />
      </Touchable>
    )
  }, [isDesktop, isSignedIn, navigateToLogin, navigateToSignUp, presentFullScreenModal, t])

  return (
    <>
      <View
        style={[
          { borderBottomColor: colors.border.secondary, height, paddingTop: top },
          jsStyles.appHeader,
          Platform.select({ default: {}, web: { display: 'flex' } }),
        ]}
      >
        {renderLeftMenu}
        {renderRightMenu}
      </View>
      {fullScreenModal}
    </>
  )
}

const jsStyles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
})
