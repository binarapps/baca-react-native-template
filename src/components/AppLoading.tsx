import { useSystemControllerCheckForAppUpdate } from '@baca/api/query/system/system'
import { Loader, Center } from '@baca/design-system/components'
import { useCachedResources, useNavigationTheme, useTranslation } from '@baca/hooks'
import { isSignedInAtom } from '@baca/store/auth'
import * as Application from 'expo-application'
import * as SplashScreen from 'expo-splash-screen'
import { useAtomValue } from 'jotai'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Alert, Platform, Linking } from 'react-native'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const { navigationTheme } = useNavigationTheme()
  const { t } = useTranslation()

  const isLoadingComplete = useCachedResources()

  const isSignedIn = useAtomValue(isSignedInAtom)
  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)

  const [isSplashHidden, setIsSplashHidden] = useState<boolean>(false)

  const onLayout = useCallback(() => {
    setIsLayoutReady(true)
  }, [])

  const isLoading = !isLoadingComplete || isSignedIn === null || !isLayoutReady

  const currentVersion = Application.nativeApplicationVersion || 'unknown'
  const os = Platform.OS

  const { mutate: checkForUpdate } = useSystemControllerCheckForAppUpdate()

  useEffect(() => {
    if (os === 'ios' || os === 'android') {
      checkForUpdate(
        {
          data: {
            currentVersion,
            os,
          },
        },
        {
          onSuccess: (data) => {
            if (data.updateRequired) {
              const storeUrl =
                os === 'ios'
                  ? `https://apps.apple.com/app/id${data.appId}`
                  : `https://play.google.com/store/apps/details?id=${data.appId}`
              Alert.alert(t('update.alert_title'), t('update.alert_message'), [
                { text: t('update.update_now'), onPress: () => Linking.openURL(storeUrl) },
              ])
            }
          },
          onError: (error) => {
            console.error('Error checking for updates:', error)
            // CONFIG: Add log to your analytics service, for example - sentry or crashlytics
          },
        }
      )
    }
  }, [os, currentVersion, checkForUpdate, t])

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
