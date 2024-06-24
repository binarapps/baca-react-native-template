import { Icon, Row, Text } from '@baca/design-system'
import { IconNames } from '@baca/types'
import { Platform, StyleSheet } from 'react-native'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { useUniversalWidth } from '../hooks'
import { getTabColor } from '../navigation-config'

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
  const isLarge = useUniversalWidth(1264)

  return (
    <TabBarItemWrapper {...{ name, onPress, params }} id={name} style={jsStyles.sidebarTabItem}>
      {({ focused, hovered }) => (
        <Row
          alignItems="center"
          borderRadius={8}
          p={2}
          gap={4}
          bg={hovered ? 'bg.tertiary' : undefined}
          style={[
            Platform.select({
              web: {
                transitionDuration: '200ms',
                transitionProperty: ['background-color', 'box-shadow', 'transform'],
                transitionTimingFunction: 'cubic-bezier(0.17, 0.17, 0, 1)',
              },
            }),
            hovered && {
              transform: [{ scale: 1.1 }],
            },
          ]}
        >
          <Icon color={getTabColor(focused)} name={focused ? iconFocused : icon} size={30} />
          {isLarge ? (
            <Text.MdSemibold color={getTabColor(focused)}>{children}</Text.MdSemibold>
          ) : null}
        </Row>
      )}
    </TabBarItemWrapper>
  )
}

const jsStyles = StyleSheet.create({
  sidebarTabItem: {
    paddingVertical: 4,
    width: '100%',
  },
})
