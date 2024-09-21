import { Loader, Center, Box } from '@baca/design-system/components'
import { useCachedResources } from '@baca/hooks'
import { useCheckForAppUpdate } from '@baca/hooks/useCheckForAppUpdate'
import { isSignedInAtom } from '@baca/store/auth'
import * as SplashScreen from 'expo-splash-screen'
import { useAtomValue } from 'jotai'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
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
    <Box {...{ onLayout }} flex={1}>
      {!isSplashHidden ? (
        <Center bg="bg.primary" flexGrow={1}>
          <Loader type="bubbles" />
        </Center>
      ) : (
        children
      )}
    </Box>
  )
}
