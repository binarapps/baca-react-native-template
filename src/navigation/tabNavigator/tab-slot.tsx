// Like <Slot /> from Expo Router but with stored tab history.
import { CommonActions } from '@react-navigation/native'
import { TabRouter } from '@react-navigation/routers'
import { Link, Navigator } from 'expo-router'
import { Screen as RouterScreen } from 'expo-router/build/views/Screen'
import * as React from 'react'
import { GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native'
import { Screen, ScreenContainer } from 'react-native-screens'

import { useContextRoute, useLinkBuilder, useNavigatorContext } from './hooks'

export function TabbedNavigator(props: React.ComponentProps<typeof Navigator>) {
  return <Navigator {...props} router={TabRouter} />
}

export default function TabbedSlot({
  detachInactiveScreens = true,
  style,
}: {
  detachInactiveScreens?: boolean
  style?: ViewStyle
}) {
  const { state, descriptors } = useNavigatorContext()
  const focusedRouteKey = state.routes[state.index].key
  const [loaded, setLoaded] = React.useState([focusedRouteKey])

  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey])
  }

  const { routes } = state

  return (
    <ScreenContainer enabled={detachInactiveScreens} hasTwoStates style={styles.container}>
      {routes.map((route, index) => {
        const descriptor = descriptors[route.key]
        const {
          freezeOnBlur,
          lazy = true,
          unmountOnBlur,
        } = descriptor.options as unknown as {
          lazy: boolean
          unmountOnBlur?: boolean
          freezeOnBlur: boolean
        }
        const isFocused = state.index === index

        if (unmountOnBlur && !isFocused) {
          return null
        }

        if (lazy && !loaded.includes(route.key) && !isFocused) {
          // Don't render a lazy screen if we've never navigated to it
          return null
        }

        const zIndex = { zIndex: isFocused ? 0 : -1 }

        return (
          <Screen
            activityState={isFocused ? 2 : 0}
            key={route.key}
            style={[styles.screen, style, zIndex]}
            accessibilityElementsHidden={!isFocused}
            importantForAccessibility={isFocused ? 'auto' : 'no-hide-descendants'}
            enabled={detachInactiveScreens}
            freezeOnBlur={freezeOnBlur}
          >
            {descriptor.render()}
          </Screen>
        )
      })}
    </ScreenContainer>
  )
}

export function TabLink({
  name,
  params,
  ...props
}: { name: string; params?: Record<string, string> } & Omit<
  React.ComponentProps<typeof Link>,
  'href' | 'onPress' | 'onLongPress'
>) {
  const buildLink = useLinkBuilder()
  const ctxRoute = useContextRoute(name)

  if (!ctxRoute) {
    return null
  }

  const { route, target, navigation } = ctxRoute

  const onPress = (
    e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    // @ts-expect-error: event type does not contain defaultPrevented, which should be available here on web
    if (!event.defaultPrevented) {
      e.preventDefault()
      navigation.dispatch({
        ...CommonActions.navigate({ name: route.name, merge: true, params }),
        target,
      })
    }
  }

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  return <Link {...{ ...props, onPress, onLongPress }} href={buildLink(name) || '/'} />
}

TabbedNavigator.Slot = TabbedSlot
TabbedNavigator.Link = TabLink
TabbedNavigator.Screen = RouterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  screen: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
})
