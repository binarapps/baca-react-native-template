import cssStyles from '@baca/styles'
import { StyleSheet } from '@bacons/react-views'
import React from 'react'
import { Platform, View } from 'react-native'

import { AppHeader, BottomBar, SideBar } from './components'
import { useUniversalWidth } from './hooks'
import { TabbedNavigator } from './tab-slot'
import { cns } from './utils'

export function ResponsiveNavigator() {
  const isRowLayout = useUniversalWidth(768)

  return (
    <TabbedNavigator>
      <View
        style={[
          jsStyles.flex1,
          Platform.select({
            default: {
              flexDirection: isRowLayout ? 'row' : 'column',
            },
            web: cns(cssStyles.container),
          }),
        ]}
      >
        <SideBar visible={isRowLayout} />
        <View style={jsStyles.flexGrow1}>
          <AppHeader />
          <View style={jsStyles.flex1}>
            <TabbedNavigator.Slot />
          </View>
        </View>

        <BottomBar visible={!isRowLayout} />
      </View>
    </TabbedNavigator>
  )
}

const jsStyles = StyleSheet.create({
  flex1: { flex: 1 },
  flexGrow1: { flexGrow: 1 },
})
