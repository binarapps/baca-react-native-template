import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { useAtomValue } from 'jotai'

import { AbsoluteFullFill, Loader } from '@/design-system'
import { useNavigationTheme } from '@/hooks'
import { Providers } from '@/providers'
import { registerForPushNotificationsAsync } from '@/services'
import { isSignedInAtom } from '@/store/auth'

import '../App'

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
      <Layout />
    </Providers>
  )
}
