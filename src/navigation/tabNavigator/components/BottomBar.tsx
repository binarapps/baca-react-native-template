import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabBarItemWrapper } from './TabBarItemWrapper'
import { Colors, ColorsStrings, bottomTabs } from '../config'
import { cns } from '../utils'

import { Icon } from '~components'
import { useColorScheme } from '~contexts'
import cssStyles from '~styles'

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
                color={colorScheme === 'light' ? Colors.tabIconDark : Colors.tabIconLight}
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
    borderTopColor: ColorsStrings.lightGray,
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
