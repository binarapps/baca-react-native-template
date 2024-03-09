import { palette } from '@baca/design-system'
import { IconNames } from '@baca/types/icon'
import { hex2rgba } from '@baca/utils'

type Tab = {
  displayedName: string
  icon: IconNames
  iconFocused: IconNames
  id: string
  name: string
  params?: Record<string, string>
}
type Tabs = Tab[]

// name with '/' at the begging will not be resolved as 'bottom tab', will be as usual screen
export const upperSideTabs: Tabs = [
  {
    displayedName: 'Home',
    icon: 'home-3-line',
    iconFocused: 'home-3-fill',
    id: 'home',
    name: 'home',
  },
  {
    displayedName: 'Categories',
    icon: 'stack-line',
    iconFocused: 'stack-fill',
    id: 'categories',
    name: 'categories',
  },
  {
    displayedName: 'Example',
    icon: 'aliens-line',
    iconFocused: 'aliens-fill',
    id: 'example',
    name: 'example',
  },
  {
    displayedName: 'Settings',
    icon: 'settings-2-line',
    iconFocused: 'settings-2-fill',
    id: 'settings',
    name: 'settings',
  },
  {
    displayedName: 'Profile',
    icon: 'user-3-line',
    iconFocused: 'user-3-fill',
    id: 'profile',
    name: 'profile',
  },

  // In case you want to navigate to screen with params you can do this like this
  // {
  //   displayedName: 'Details',
  //   icon: 'baidu-line',
  //   iconFocused: 'baidu-fill',
  //   id: 'details',
  //   name: '/home/details',
  //   params: { user: 'example@test.com' },
  // },
]

export const bottomSideTabs: Tabs = []

export const bottomTabs: Tabs = [...upperSideTabs]

export const TabColors: Record<string, ColorNames> = {
  tabIconDark: 'text.brand.tertiary',
  tabIconLight: 'text.success.primary',
} as const

export const TabColorsStrings = {
  lightGray: palette.gray['300'],
  lightGray50: hex2rgba(palette.gray['50'], 0.5),
  tabTextDark: palette.gray['700'],
  tabTextLight: palette.gray['300'],
  transparent: 'transparent',
} as const
