import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalProvider } from '@gorhom/portal'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ColorSchemeProvider } from './ColorSchemeProvider'
import { NotificationsProvider } from './NotificatedProvider'
import { NotificationProvider as ExpoNotificationsProvider } from './NotificationProvider'

import { AppLoading } from '@/components'
import { useAppStateActive } from '@/hooks'
import { AuthLogic } from '@/logic/AuthLogic'
import { queryClient } from '@/queryClient'
import { store } from '@/store'
import { checkForUpdates } from '@/utils'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  useAppStateActive(checkForUpdates, false)

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <PortalProvider>
        <ColorSchemeProvider>
          <SafeAreaProvider>
            <Provider store={store}>
              <ExpoNotificationsProvider>
                <NotificationsProvider>
                  <QueryClientProvider client={queryClient}>
                    <AppLoading>
                      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
                    </AppLoading>
                    <AuthLogic />
                  </QueryClientProvider>
                </NotificationsProvider>
              </ExpoNotificationsProvider>
            </Provider>
          </SafeAreaProvider>
        </ColorSchemeProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
})
