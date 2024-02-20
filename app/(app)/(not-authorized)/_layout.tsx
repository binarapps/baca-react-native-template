import { Redirect, Stack } from 'expo-router'

import { useAuth } from '~hooks'

export const unstable_settings = {
  initialRouteName: 'sign-in',
}

export default function AuthLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn === true) {
    return <Redirect href="/home" />
  }

  return <Stack />
}
