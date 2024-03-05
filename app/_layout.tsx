import { AbsoluteFullFill, Loader, StatusBar } from '@baca/components'
import { useNavigationTheme, useRouterNotifications } from '@baca/hooks'
import { Providers } from '@baca/providers'
import { isSignedInAtom } from '@baca/store/auth'
import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { useAtomValue } from 'jotai'

export const unstable_settings = {
  initialRouteName: 'index',
}

const Layout = () => {
  const isSignedIn = useAtomValue(isSignedInAtom)
  const { navigationTheme } = useNavigationTheme()

  useRouterNotifications() // TODO: check if handling notification deeplinks works correctly

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
