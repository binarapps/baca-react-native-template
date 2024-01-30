import { Tabs } from 'expo-router'

import { Icon } from '~components'
import { useNavigationTheme } from '~hooks'
import { IconNames } from '~types/icon'

export const unstable_settings = {
  initialRouteName: 'home',
}

function TabBarIcon(props: { name: IconNames; color: ColorNames }) {
  return <Icon name={props.name} size={28} color={props.color} />
}

export default function TabLayout() {
  const { tabBarTheme } = useNavigationTheme()

  return (
    <Tabs
      screenOptions={{
        ...tabBarTheme,
        header: () => null,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code-line" color={color as ColorNames} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code-line" color={color as ColorNames} />,
        }}
      />
    </Tabs>
  )
}
