import { isSignedInAtom } from '@baca/store/auth'
import { Redirect, Stack } from 'expo-router'
import { useAtomValue } from 'jotai'

export const unstable_settings = {
  initialRouteName: 'sign-in',
}

export default function NotAuthorizedLayout() {
  const isSignedIn = useAtomValue(isSignedInAtom)

  if (isSignedIn === true) {
    return <Redirect href="/home" />
  }

  return <Stack />
}
