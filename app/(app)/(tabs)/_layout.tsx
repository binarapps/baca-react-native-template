import { Redirect, Tabs } from 'expo-router'

import { Icon } from '~components'
import { useAuth, useNavigationTheme } from '~hooks'
import { IconNames } from '~types/icon'

export const unstable_settings = {
  initialRouteName: 'home',
}

function TabBarIcon(props: { name: IconNames; color: ColorNames }) {
  return <Icon name={props.name} size={28} color={props.color} />
}

export default function TabLayout() {
  const { tabBarTheme } = useNavigationTheme()
  const { isSignedIn } = useAuth()

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

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
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code-line" color={color as ColorNames} />,
        }}
      />
      <Tabs.Screen
        name="example"
        options={{
          title: 'Example',
          tabBarIcon: ({ color }) => <TabBarIcon name="code-line" color={color as ColorNames} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="code-line" color={color as ColorNames} />,
        }}
      />
    </Tabs>
  )
}
