import { useScreenOptions } from '~hooks'
import { ResponsiveNavigator } from '~navigation/tabNavigator/navigator'

export const unstable_settings = {
  initialRouteName: 'home',
}

export default function TabLayout() {
  useScreenOptions({
    headerShown: false,
  })
  return <ResponsiveNavigator />
}
