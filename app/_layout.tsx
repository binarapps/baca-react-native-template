import { ThemeProvider } from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'

import { useAuth, useEffect, useNavigationTheme } from '~hooks'
import { Providers } from '~providers'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

function Layout() {
  const { navigationTheme } = useNavigationTheme()

  const { isSignedIn } = useAuth()
  const { replace } = useRouter()

  console.log('shit', isSignedIn)

  useEffect(() => {
    if (!isSignedIn) {
      replace('/sign-in')
    }
  }, [isSignedIn, replace])

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  )
}

export default function AppLayout() {
  return (
    <Providers>
      <Layout />
    </Providers>
  )
}
