import { palette } from '~constants'
import { IconNames } from '~types/icon'
import { hex2rgba } from '~utils'

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
    displayedName: 'Details',
    icon: 'baidu-line',
    iconFocused: 'baidu-fill',
    id: 'details',
    name: '/home/details',
    params: { user: 'example@test.com' },
  },
]

export const bottomSideTabs: Tabs = []

export const bottomTabs: Tabs = [...upperSideTabs]

export const Colors: Record<string, ColorNames> = {
  tabIconDark: 'gray.700',
  tabIconLight: 'gray.200',
} as const

export const ColorsStrings = {
  lightGray: palette.gray['300'],
  lightGray50: hex2rgba(palette.gray['50'], 0.5),
  tabTextDark: palette.gray['700'],
  tabTextLight: palette.gray['300'],
  transparent: 'transparent',
} as const
