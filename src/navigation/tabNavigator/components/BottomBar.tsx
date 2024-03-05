import { Icon } from '@baca/components'
import { useColorScheme } from '@baca/contexts'
import cssStyles from '@baca/styles'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { bottomTabs, TabColors, TabColorsStrings } from '../config'
import { cns } from '../utils'

export function BottomBar({ visible }: { visible: boolean }) {
  const { colorScheme } = useColorScheme()
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
      <View style={jsStyles.nav}>
        {bottomTabs.map((tab, i) => (
          <TabBarItemWrapper key={i} name={tab.name} id={tab.id} params={tab.params}>
            {({ focused, pressed, hovered }) => (
              <Icon
                name={focused ? tab.iconFocused : tab.icon}
                size={40}
                color={colorScheme === 'light' ? TabColors.tabIconDark : TabColors.tabIconLight}
                style={[
                  jsStyles.tabIcon,
                  pressed && jsStyles.tabIconPressed,
                  Platform.select({
                    web: {
                      transitionDuration: '200ms',
                      transform: hovered ? [{ scale: 1.2 }] : [{ scale: 1 }],
                    },
                  }),
                ]}
              />
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
    borderTopColor: TabColorsStrings.lightGray,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 49,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },

  tabIcon: {
    paddingHorizontal: 8,
  },
  tabIconPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
})
