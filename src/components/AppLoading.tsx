import { AbsoluteFullFill, Loader, Center } from '@baca/design-system/components'
import { useBoolean, useCachedResources, useFonts } from '@baca/hooks'
import { isSignedInAtom } from '@baca/store/auth'
import * as SplashScreen from 'expo-splash-screen'
import { useAtomValue } from 'jotai'
import { FC, PropsWithChildren, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const [fontsLoaded, fontError] = useFonts({
    Lato_400Regular: require('../../assets/fonts/Lato_Regular.ttf'),
    Lato_500Medium: require('../../assets/fonts/Lato_Medium.ttf'),
    Lato_600SemiBold: require('../../assets/fonts/Lato_SemiBold.ttf'),
    Lato_700Bold: require('../../assets/fonts/Lato_Bold.ttf'),
    IcoMoon: require('../../assets/icomoon/icomoon.ttf'),
  })

  // Delay loading logic was made to prevent displaying empty screen after splash screen will hide
  const [isDelayLoading, setIsDelayLoading] = useBoolean(true)

  const isSignedIn = useAtomValue(isSignedInAtom)

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.warn(e)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    try {
      // Source: https://docs.expo.dev/versions/latest/sdk/splash-screen/#usage
      // This tells the splash screen to hide immediately! If we call this after
      // `prepare`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync()
      }
    } catch {
      console.log('There was some error while hiding splash screen')
    }
  }, [fontsLoaded, fontError])

  const isLoading = !isLoadingComplete || isSignedIn === null

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsDelayLoading.off()
      }, 200)
    }
  }, [isLoading, setIsDelayLoading])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {isLoading ? null : children}
      {isLoading || isDelayLoading ? (
        <AbsoluteFullFill bg="fg.white">
          <Center flex={1}>
            <Loader type="bubbles" />
          </Center>
        </AbsoluteFullFill>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
