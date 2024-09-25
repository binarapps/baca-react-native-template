import { Icon, Row, Text } from '@baca/design-system'
import { IconNames } from '@baca/types'
import { makeBigerOnHover } from '@baca/utils/webStyling'
import { StyleSheet } from 'react-native'

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
          style={makeBigerOnHover(hovered)}
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
