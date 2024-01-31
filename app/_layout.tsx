import { ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'

import { AbsoluteFullFill, Loader } from '~components'
import { useAuth, useNavigationTheme } from '~hooks'
import { Providers } from '~providers'

export const unstable_settings = {
  initialRouteName: 'index',
}

const Layout = () => {
  const { isSignedIn } = useAuth()
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
