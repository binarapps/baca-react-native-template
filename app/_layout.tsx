import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'

import { AbsoluteFullFill, Loader, StatusBar } from '~components'
import { useAuth, useNavigationTheme, useRouterNotifications } from '~hooks'
import { Providers } from '~providers'

export const unstable_settings = {
  initialRouteName: 'index',
}

const Layout = () => {
  const { isSignedIn } = useAuth()
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
