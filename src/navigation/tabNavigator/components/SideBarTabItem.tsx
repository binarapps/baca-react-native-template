import { Icon, Text } from '@baca/design-system'
import { useTheme } from '@baca/hooks'
import { IconNames } from '@baca/types/icon'
import { Platform, StyleSheet, View } from 'react-native'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { useWidth } from '../hooks'

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
  const { colors } = useTheme()

  return (
    <TabBarItemWrapper {...{ name, onPress, params }} id={name} style={jsStyles.sidebarTabItem}>
      {({ focused, hovered }) => (
        <View
          style={[
            jsStyles.sidebarItemContainer,
            hovered && {
              backgroundColor: colors.bg.tertiary,
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
            <Icon color="nav.item.button.icon.fg" name={focused ? iconFocused : icon} size={30} />
          </View>
          <Text
            color="text.secondary"
            // eslint-disable-next-line react-native/no-inline-styles
            style={[jsStyles.sidebarItemText, { display: isLarge ? 'flex' : 'none' }]}
            variant={focused ? 'MdBold' : 'MdSemibold'}
          >
            {children}
          </Text>
        </View>
      )}
    </TabBarItemWrapper>
  )
}

const jsStyles = StyleSheet.create({
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
    marginLeft: 16,
    marginRight: 16,
    userSelect: 'none',
  },
  sidebarTabItem: {
    paddingVertical: 4,
    width: '100%',
  },
})
