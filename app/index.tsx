import { Redirect } from 'expo-router'
import { Platform } from 'react-native'

import { useAuth } from '~hooks'
import { LandingScreen } from '~screens/LandingScreen'

export default function Root() {
  const { isSignedIn } = useAuth()

  if (isSignedIn === true) {
    return <Redirect href="/home" />
  }

  if (Platform.OS === 'web') {
    return <LandingScreen />
  }

  return <Redirect href="/sign-in" />
}
