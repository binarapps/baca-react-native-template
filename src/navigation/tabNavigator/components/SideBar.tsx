import { StyleSheet, View } from 'react-native'

import { HeaderLogo } from './HeaderLogo'
import { SideBarTabItem } from './SideBarTabItem'
import { useUniversalWidth } from '../hooks'
import { upperSideTabs } from '../navigation-config'

import { useSafeAreaInsets, useTheme } from '@/hooks'
import { signOut } from '@/store/auth'

const NAV_MEDIUM_WIDTH = 244

export function SideBar({ visible }: { visible: boolean }) {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()
  const isLarge = useUniversalWidth(1264)

  return (
    <View
      style={[
        jsStyles.sideBar,
        !visible &&
          ({
            display: 'none',
          } as const),
        isLarge &&
          ({
            minWidth: NAV_MEDIUM_WIDTH,
          } as const),
      ]}
    >
      <View
        style={[
          jsStyles.sidebarInner,
          { paddingTop: top + 8 },
          { borderRightColor: colors.border.secondary },
          isLarge &&
            ({
              width: NAV_MEDIUM_WIDTH,
              minWidth: NAV_MEDIUM_WIDTH,
              alignItems: 'flex-start',
            } as const),
        ]}
      >
        <View
          style={[
            jsStyles.sidebarInner2,
            !isLarge &&
              ({
                alignItems: 'center',
              } as const),
          ]}
        >
          <HeaderLogo />

          <View style={jsStyles.sidebarTabs}>
            {upperSideTabs.map((tab) => (
              <SideBarTabItem key={tab.name} {...tab} />
            ))}
          </View>
          <View>
            <SideBarTabItem
              icon="logout-box-line"
              iconFocused="logout-box-fill"
              name="/sign-in"
              onPress={signOut}
              // eslint-disable-next-line react-native/no-raw-text
            >
              Logout
            </SideBarTabItem>
          </View>
        </View>
      </View>
    </View>
  )
}

const jsStyles = StyleSheet.create({
  sideBar: {
    minWidth: 72,
    width: 72,
  },

  sidebarInner: {
    alignItems: 'stretch',
    borderRightWidth: 1,
    height: '100%',
    maxHeight: '100%',
    minWidth: 72,
    paddingBottom: 20,
    paddingHorizontal: 12,
    position: 'absolute',
    width: 72,
  },
  sidebarInner2: {
    alignItems: 'stretch',
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  },

  sidebarTabs: { flex: 1, gap: 4 },
})
