import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { useAtomValue } from 'jotai'

import { AbsoluteFullFill, Loader, StatusBar } from '~components'
import { useNavigationTheme, useRouterNotifications } from '~hooks'
import { Providers } from '~providers'
import { isSignedInAtom } from '~store/auth'

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
