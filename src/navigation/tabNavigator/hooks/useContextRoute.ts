import { Navigator } from 'expo-router'

export function useContextRoute(name: string) {
  const context = Navigator.useContext()

  const { state, navigation, descriptors } = context

  const route = state.routes.find((route) => {
    return route.name === name
  })

  if (!route) {
    console.warn(
      `Could not find route with name: ${name}. Options: ${state.routes
        .map((r) => r.name)
        .join(', ')}`
    )
  }

  if (!route) {
    return null
  }

  return {
    route,
    target: state.key,
    navigation,
    descriptor: descriptors[route.key],
  }
}
