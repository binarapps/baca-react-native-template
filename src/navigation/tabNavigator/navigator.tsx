import { StyleSheet } from '@bacons/react-views'
import React from 'react'
import { View } from 'react-native'

import { AppHeader, BottomBar, SideBar } from './components'
import { useUniversalWidth } from './hooks'
import { TabbedNavigator } from './tab-slot'

export function ResponsiveNavigator() {
  const isRowLayout = useUniversalWidth(768)

  return (
    <TabbedNavigator>
      <View style={[jsStyles.flex1, isRowLayout ? jsStyles.flexRow : jsStyles.flexColumn]}>
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
  flexColumn: { flexDirection: 'column' },
  flexGrow1: { flexGrow: 1 },
  flexRow: { flexDirection: 'row' },
})
