import { StyleSheet } from 'react-native'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { useUniversalWidth } from '../hooks'
import { getTabColor } from '../navigation-config'

import { Icon, Row, Text } from '@/design-system'
import { useTranslation } from '@/hooks'
import { I18nKeys, IconNames } from '@/types'
import { makeBigerOnHover } from '@/utils/webStyling'

export function SideBarTabItem({
  children,
  icon,
  iconFocused,
  name,
  onPress,
  params,
  displayedNameTx,
}: {
  children?: string
  icon: IconNames
  iconFocused: IconNames
  name: string
  onPress?(): void
  params?: Record<string, string>
  displayedNameTx?: I18nKeys
}) {
  const isLarge = useUniversalWidth(1264)
  const { t } = useTranslation()

  const textToDisplay = displayedNameTx ? t(displayedNameTx) : children

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
          {isLarge && textToDisplay ? (
            <Text.MdSemibold color={getTabColor(focused)}>{textToDisplay}</Text.MdSemibold>
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
