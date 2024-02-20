import { useNavigatorContext } from './useNavigatorContext'

export function useIsTabSelected(name: string): boolean {
  const { navigation } = useNavigatorContext()

  const state = navigation.getState()
  const current = state.routes.find((_, i) => state.index === i)

  return current?.name === name
}
