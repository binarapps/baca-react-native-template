import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useScreenOptions = ({
  title,
  presentation,
}: {
  title?: string
  presentation?: string
}) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title, presentation })
  }, [navigation, presentation, title])
}
