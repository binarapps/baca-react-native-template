import { I18nKeys } from '@baca/types/i18next'
import { IconNames } from '@baca/types/icon'

type Tab = {
  // This will be passed to translations object and translated in the app
  displayedNameTx: I18nKeys
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
    displayedNameTx: 'bottom_tabs.home',
    icon: 'home-5-line',
    iconFocused: 'home-5-fill',
    id: 'home',
    name: 'home',
  },
  {
    displayedNameTx: 'bottom_tabs.categories',
    icon: 'stack-line',
    iconFocused: 'stack-fill',
    id: 'categories',
    name: 'categories',
  },
  {
    displayedNameTx: 'bottom_tabs.example',
    icon: 'aliens-line',
    iconFocused: 'aliens-fill',
    id: 'example',
    name: 'example',
  },
  {
    displayedNameTx: 'bottom_tabs.settings',
    icon: 'settings-2-line',
    iconFocused: 'settings-2-fill',
    id: 'settings',
    name: 'settings',
  },
  {
    displayedNameTx: 'bottom_tabs.profile',
    icon: 'user-3-line',
    iconFocused: 'user-3-fill',
    id: 'profile',
    name: 'profile',
  },

  // In case you want to navigate to screen with params you can do this like this
  // {
  //   displayedNameTx: 'bottom_tabs.details',
  //   icon: 'baidu-line',
  //   iconFocused: 'baidu-fill',
  //   id: 'details',
  //   name: '/home/details',
  //   params: { user: 'example@test.com' },
  // },
]

export const bottomSideTabs: Tabs = []

export const bottomTabs: Tabs = [...upperSideTabs]

export const tabsColors: {
  color: ColorNames
  colorFocused: ColorNames
} = {
  color: 'nav.item.button.icon.fg',
  colorFocused: 'Brand.600',
}

export const getTabColor = (isFocused = false) =>
  isFocused ? tabsColors.colorFocused : tabsColors.color
