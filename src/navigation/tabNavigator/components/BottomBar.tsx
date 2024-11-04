import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { bottomTabs, getTabColor } from '../navigation-config'

import { Column, Icon, Text } from '@/design-system'
import { useTheme, useTranslation } from '@/hooks'

export function BottomBar({ visible }: { visible: boolean }) {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { bottom } = useSafeAreaInsets()

  if (!visible) {
    return null
  }

  return (
    <View
      style={[
        {
          paddingBottom: bottom,
        },
      ]}
    >
      <View style={[jsStyles.nav, { borderTopColor: colors.border.secondary }]}>
        {bottomTabs.map((tab, i) => (
          <View
            style={{
              width: `${100 / bottomTabs.length}%`,
            }}
            key={i}
          >
            <TabBarItemWrapper
              key={i}
              name={tab.name}
              id={tab.id}
              params={tab.params}
              testID={'bottom_tab_button:' + tab.name}
            >
              {({ focused, pressed, hovered }) => (
                <Column
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
                    size={tab.displayedNameTx ? 24 : 40}
                    color={getTabColor(focused)}
                  />
                  {!!tab.displayedNameTx && (
                    <Text.XsMedium color={getTabColor(focused)}>
                      {t(tab.displayedNameTx)}
                    </Text.XsMedium>
                  )}
                </Column>
              )}
            </TabBarItemWrapper>
          </View>
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
