import { Icon } from '@baca/components'
import { useColorScheme } from '@baca/contexts'
import cssStyles from '@baca/styles'
import { IconNames } from '@baca/types/icon'
import { Text } from '@bacons/react-views'
import { Platform, StyleSheet, View } from 'react-native'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { TabColors, TabColorsStrings } from '../config'
import { useWidth } from '../hooks'
import { cns } from '../utils'

export function SideBarTabItem({
  children,
  icon,
  iconFocused,
  name,
  onPress,
  params,
}: {
  children: string
  icon: IconNames
  iconFocused: IconNames
  name: string
  onPress?(): void
  params?: Record<string, string>
}) {
  const isLarge = useWidth(1264)
  const { colorScheme } = useColorScheme()

  return (
    <TabBarItemWrapper {...{ name, onPress, params }} id={name} style={jsStyles.sidebarTabItem}>
      {({ focused, hovered }) => (
        <View
          style={[
            jsStyles.sidebarItemContainer,
            hovered && {
              backgroundColor: TabColorsStrings.lightGray50,
            },
          ]}
        >
          <View
            style={[
              jsStyles.sidebarIconContainer,
              hovered && {
                transform: [{ scale: 1.1 }],
              },
            ]}
          >
            <Icon
              name={focused ? iconFocused : icon}
              size={30}
              color={colorScheme === 'light' ? TabColors.tabIconDark : TabColors.tabIconLight}
            />
          </View>

          <Text
            style={[
              jsStyles.sidebarItemText,
              Platform.select({
                default: {
                  display: isLarge ? 'flex' : 'none',
                },
                web: cns(cssStyles.sideBarTabItemText),
              }),
              {
                color:
                  colorScheme === 'light'
                    ? TabColorsStrings.tabTextDark
                    : TabColorsStrings.tabTextLight,
              },
              focused && jsStyles.fontBold,
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TabBarItemWrapper>
  )
}

const jsStyles = StyleSheet.create({
  fontBold: { fontWeight: 'bold' },
  sidebarIconContainer: Platform.select({
    default: { padding: 0 },
    web: {
      transitionDuration: '150ms',
      transitionProperty: ['transform'],
      transitionTimingFunction: 'cubic-bezier(0.17, 0.17, 0, 1)',
    },
  }),
  sidebarItemContainer: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 8,
    ...Platform.select({
      web: {
        transitionDuration: '200ms',
        transitionProperty: ['background-color', 'box-shadow'],
      },
    }),
  },
  sidebarItemText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginRight: 16,
  },
  sidebarTabItem: {
    paddingVertical: 4,
    width: '100%',
  },
})
