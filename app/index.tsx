import { LandingScreen } from '@baca/screens/LandingScreen'
import { isSignedInAtom } from '@baca/store/auth'
import { Redirect } from 'expo-router'
import { useAtomValue } from 'jotai'
import { Platform } from 'react-native'

export default function Root() {
  const isSignedIn = useAtomValue(isSignedInAtom)

  if (isSignedIn === true) {
    return <Redirect href="/home" />
  }

  if (Platform.OS === 'web') {
    return <LandingScreen />
  }

  return <Redirect href="/sign-in" />
}
