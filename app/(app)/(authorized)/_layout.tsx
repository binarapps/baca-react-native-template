import { Redirect, Stack } from 'expo-router'

import { useAuth } from '~hooks'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function TabLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

  return <Stack screenOptions={{ headerBackTitleVisible: false }} />
}
