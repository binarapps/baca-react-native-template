import { Loader, Center } from '@baca/design-system/components'
import { useCachedResources, useNavigationTheme } from '@baca/hooks'
import { useCheckForAppUpdate } from '@baca/hooks/useCheckForAppUpdate'
import { isSignedInAtom } from '@baca/store/auth'
import * as SplashScreen from 'expo-splash-screen'
import { useAtomValue } from 'jotai'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const { navigationTheme } = useNavigationTheme()
  const isLoadingComplete = useCachedResources()
  const isSignedIn = useAtomValue(isSignedInAtom)

  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)
  const [isSplashHidden, setIsSplashHidden] = useState<boolean>(false)
  const isUpdateLoading = useCheckForAppUpdate()

  const onLayout = useCallback(() => {
    setIsLayoutReady(true)
  }, [])

  const isLoading = !isLoadingComplete || isSignedIn === null || !isLayoutReady || isUpdateLoading

  useEffect(() => {
    const hideSplashScreen = () => {
      setTimeout(async () => {
        await SplashScreen.hideAsync()
        setTimeout(() => setIsSplashHidden(true), 0)
      }, 150)
    }
    if (!isLoading) {
      hideSplashScreen()
    }
  }, [isLoading])

  return (
    <View
      {...{ onLayout }}
      style={[styles.container, { backgroundColor: navigationTheme.colors.background }]}
    >
      {!isSplashHidden ? (
        <Center bg="bg.primary" flexGrow={1}>
          <Loader type="bubbles" />
        </Center>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
