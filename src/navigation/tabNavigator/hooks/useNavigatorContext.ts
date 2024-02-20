import { TabRouter } from '@react-navigation/routers'
import { Navigator } from 'expo-router'

export function useNavigatorContext() {
  const context = Navigator.useContext()

  if (process.env.NODE_ENV !== 'production') {
    if (!(context.router.name === 'TabRouter' || context.router instanceof TabRouter)) {
      throw new Error(
        'useTabbedSlot must be used inside a Navigator with a tab router: <Navigator route={TabRouter} />'
      )
    }
  }

  return context
}
