import { Platform, useWindowDimensions } from 'react-native'

export function useWidth(size: number): boolean {
  const { width } = useWindowDimensions()
  if (typeof window === 'undefined') {
    return true
  }
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return false
  }
  return width >= size
}
