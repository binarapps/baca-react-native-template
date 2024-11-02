import * as SplashScreen from 'expo-splash-screen'
import { useAtomValue } from 'jotai'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { Loader, Center, Box } from '@/design-system/components'
import { useCachedResources } from '@/hooks'
import { useCheckForAppUpdate } from '@/hooks/useCheckForAppUpdate'
import { isSignedInAtom } from '@/store/auth'
import { wait } from '@/utils'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

/**
 * AppLoading handles the application's initial loading state,
 * including splash screen, resource caching, and auth state.
 * @param {PropsWithChildren} props - React children components
 * @returns {ReactElement}
 */
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
    const hideSplashScreen = async () => {
      await wait(150)
      await SplashScreen.hideAsync()

      await wait(1)
      setIsSplashHidden(true)
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
