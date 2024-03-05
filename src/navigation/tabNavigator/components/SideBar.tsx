import { signOut } from '@baca/store/auth'
import cssStyles from '@baca/styles'
import { Platform, StyleSheet, View } from 'react-native'

import { HeaderLogo } from './HeaderLogo'
import { SideBarTabItem } from './SideBarTabItem'
import { TabColorsStrings, upperSideTabs } from '../config'
import { useWidth } from '../hooks'
import { cns } from '../utils'

const NAV_MEDIUM_WIDTH = 244

export function SideBar({ visible }: { visible: boolean }) {
  const isLarge = useWidth(1264)

  return (
    <View
      style={[
        jsStyles.sideBar,
        ...Platform.select({
          default: [
            !visible &&
              ({
                display: 'none',
              } as const),
            isLarge &&
              ({
                minWidth: NAV_MEDIUM_WIDTH,
              } as const),
          ],

          web: [cns(cssStyles.largeVisible, cssStyles.sideBar)],
        }),
      ]}
    >
      <View
        style={[
          jsStyles.sidebarInner,
          ...Platform.select({
            default: [
              isLarge &&
                ({
                  width: NAV_MEDIUM_WIDTH,
                  minWidth: NAV_MEDIUM_WIDTH,
                  alignItems: 'flex-start',
                } as const),
            ],
            web: [cns(cssStyles.sideBarInner)],
          }),
        ]}
      >
        <View
          style={[
            jsStyles.sidebarInner2,
            ...Platform.select({
              default: [
                !isLarge &&
                  ({
                    alignItems: 'center',
                  } as const),
              ],
              web: [cns(cssStyles.sideBarHeader)],
            }),
          ]}
        >
          <HeaderLogo />

          <View style={[jsStyles.sidebarTabs]}>
            {upperSideTabs.map((tab) => (
              <SideBarTabItem key={tab.name} {...tab}>
                {tab.displayedName}
              </SideBarTabItem>
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
    borderRightColor: TabColorsStrings.lightGray,
    borderRightWidth: 1,
    height: '100%',
    maxHeight: '100%',
    minWidth: 72,
    paddingBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 8,
    position: 'absolute',
    width: 72,
  },
  sidebarInner2: {
    alignItems: 'stretch',
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },

  sidebarTabs: { flex: 1, gap: 4 },
})
