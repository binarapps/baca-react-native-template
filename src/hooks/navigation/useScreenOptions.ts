import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useScreenOptions = ({ title }: { title: string }) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title })
  }, [navigation, title])
}
