import { useScreenOptions } from '@baca/hooks'
import { ResponsiveNavigator } from '@baca/navigation/tabNavigator/navigator'

export const unstable_settings = {
  initialRouteName: 'home',
}

export default function TabsLayout() {
  // It's added here not in higher layout because we only want to hide header only on this screen
  useScreenOptions({
    headerShown: false,
  })

  return <ResponsiveNavigator />
}
