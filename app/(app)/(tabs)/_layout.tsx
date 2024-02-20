import { Redirect } from 'expo-router'

import { useAuth } from '~hooks'
import { ResponsiveNavigator } from '~navigation/tabNavigator/navigator'

export const unstable_settings = {
  initialRouteName: 'home',
}

export default function TabLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

  return <ResponsiveNavigator />
}
