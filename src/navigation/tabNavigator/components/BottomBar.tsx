import { Column, Icon, Text } from '@baca/design-system'
import { useTheme } from '@baca/hooks'
import cssStyles from '@baca/styles'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { bottomTabs, getTabColor } from '../navigation-config'
import { cns } from '../utils'

export function BottomBar({ visible }: { visible: boolean }) {
  const { colors } = useTheme()
  return (
    <View
      style={[
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
        Platform.select({
          default: {
            display: visible ? 'flex' : 'none',
          },
          web: cns(cssStyles.smallVisible),
        }),
      ]}
    >
      <View style={[jsStyles.nav, { borderTopColor: colors.border.secondary }]}>
        {bottomTabs.map((tab, i) => (
          <TabBarItemWrapper key={i} name={tab.name} id={tab.id} params={tab.params}>
            {({ focused, pressed, hovered }) => (
              <Column
                px={2}
                alignItems="center"
                style={[
                  pressed && jsStyles.tabIconPressed,
                  Platform.select({
                    web: {
                      transitionDuration: '200ms',
                      transform: [{ scale: hovered ? 1.1 : pressed ? 0.9 : 1 }],
                    },
                  }),
                ]}
                gap={2}
              >
                <Icon
                  name={focused ? tab.iconFocused : tab.icon}
                  size={24}
                  color={getTabColor(focused)}
                />
                <Text.XsMedium color={getTabColor(focused)}>{tab.displayedName}</Text.XsMedium>
              </Column>
            )}
          </TabBarItemWrapper>
        ))}
      </View>
    </View>
  )
}

const jsStyles = StyleSheet.create({
  nav: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  tabIconPressed: {
    opacity: 0.8,
  },
})
