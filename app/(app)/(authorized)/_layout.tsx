import { Redirect, Stack } from 'expo-router'
import { useAtomValue } from 'jotai'

import { isSignedInAtom } from '@/store/auth'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function AuthorizedLayout() {
  const isSignedIn = useAtomValue(isSignedInAtom)

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

  return <Stack screenOptions={{ headerBackTitleVisible: false }} />
}
