import { checkForUpdates } from '@baca/utils'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'

export const useCachedResources = (): boolean => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [fontsLoaded, fontError] = useFonts({
    Inter_Regular: require('../../assets/fonts/Inter-Regular.ttf'),
    Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
    Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    Inter_Bold: require('../../assets/fonts/Inter-Bold.ttf'),
    IcoMoon: require('../../assets/icomoon/icomoon.ttf'),
  })

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await checkForUpdates(true)
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete && !!(fontsLoaded || fontError)
}
