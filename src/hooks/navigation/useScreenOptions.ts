import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useScreenOptions = ({
  title,
  presentation,
  headerShown,
}: {
  title?: string
  presentation?: string
  headerShown?: boolean
}) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title, presentation, headerShown })
  }, [headerShown, navigation, presentation, title])
}
