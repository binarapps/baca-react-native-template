import { StatusBar } from '@baca/components'
import { AbsoluteFullFill, Loader } from '@baca/design-system'
import { useNavigationTheme } from '@baca/hooks'
import { Providers } from '@baca/providers'
import { registerForPushNotificationsAsync } from '@baca/services'
import { isSignedInAtom } from '@baca/store/auth'
import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { useAtomValue } from 'jotai'

export const unstable_settings = {
  initialRouteName: 'index',
}

registerForPushNotificationsAsync()

const Layout = () => {
  const isSignedIn = useAtomValue(isSignedInAtom)
  const { navigationTheme } = useNavigationTheme()

  if (isSignedIn === null) {
    return (
      <AbsoluteFullFill w="full" h="full" justifyContent="center" alignItems="center">
        <Loader type="bubbles" />
      </AbsoluteFullFill>
    )
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <Slot />
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar />
      <Layout />
    </Providers>
  )
}
