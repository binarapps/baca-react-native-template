import { TextVariant } from './textVariants'
import { theme } from './theme'

export type ButtonVariant =
  | 'Primary'
  | 'PrimaryDestructive'
  | 'SecondaryColor'
  | 'SecondaryGray'
  | 'SecondaryDestructive'
  | 'TertiaryColor'
  | 'TertiaryGray'
  | 'TertiaryDestructive'
  | 'LinkColor'
  | 'LinkGray'
  | 'LinkDestructive'

type BtnStyle = {
  backgroundColor?: ColorNames
  borderColor?: ColorNames
  borderWidth?: number
  color: ColorNames
}

type VariantStyle = {
  defaultStyle: BtnStyle
  hoveredStyle: BtnStyle
  focusedStyle: BtnStyle
  disabledStyle: BtnStyle
}

export const buttonVariants: { [key in ButtonVariant]: VariantStyle } = {
  Primary: {
    defaultStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'button.primary.fg',
      borderColor: 'button.primary.border',
      borderWidth: 1,
    },
    hoveredStyle: {
      backgroundColor: 'button.primary.bg_hover',
      color: 'button.primary.fg_hover',
      borderColor: 'button.primary.border_hover',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'button.primary.fg',
      borderColor: 'button.primary.border',
      borderWidth: 1,
    },
    disabledStyle: {
      backgroundColor: 'bg.disabled',
      color: 'fg.disabled',
      borderWidth: 1,
      borderColor: 'border.disabled_subtle',
    },
  },
  PrimaryDestructive: {
    defaultStyle: {
      backgroundColor: 'button.primary.error.bg',
      color: 'fg.white',
      borderColor: 'button.primary.error.border',
      borderWidth: 1,
    },
    hoveredStyle: {
      backgroundColor: 'button.primary.error.bg_hover',
      color: 'button.primary.error.fg_hover',
      borderColor: 'button.primary.error.border_hover',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.primary.error.bg',
      color: 'fg.white',
      borderColor: 'button.primary.error.border',
      borderWidth: 1,
    },
    disabledStyle: {
      backgroundColor: 'bg.disabled',
      color: 'fg.disabled',
      borderWidth: 1,
      borderColor: 'border.disabled_subtle',
    },
  },
  SecondaryColor: {
    defaultStyle: {
      backgroundColor: 'button.secondary.color.bg',
      color: 'button.secondary.color.fg',
      borderColor: 'button.secondary.color.border',
      borderWidth: 1,
    },
    hoveredStyle: {
      backgroundColor: 'button.secondary.color.bg_hover',
      color: 'button.secondary.color.fg_hover',
      borderColor: 'button.secondary.color.border_hover',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.secondary.color.bg',
      color: 'button.secondary.color.fg',
      borderColor: 'button.secondary.color.border',
      borderWidth: 1,
    },
    disabledStyle: {
      backgroundColor: 'bg.primary',
      color: 'fg.disabled',
      borderColor: 'bg.disabled_subtle',
      borderWidth: 1,
    },
  },
  SecondaryDestructive: {
    defaultStyle: {
      backgroundColor: 'button.secondary.error.bg',
      color: 'button.secondary.error.fg',
      borderColor: 'button.secondary.error.border',
      borderWidth: 1,
    },
    hoveredStyle: {
      backgroundColor: 'button.secondary.error.bg_hover',
      color: 'button.secondary.error.fg_hover',
      borderColor: 'button.secondary.error.border_hover',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.secondary.error.bg',
      color: 'button.secondary.error.fg',
      borderColor: 'button.secondary.error.border',
      borderWidth: 1,
    },
    disabledStyle: {
      backgroundColor: 'bg.primary',
      color: 'fg.disabled',
      borderColor: 'bg.disabled_subtle',
      borderWidth: 1,
    },
  },
  SecondaryGray: {
    defaultStyle: {
      backgroundColor: 'button.secondary.bg',
      color: 'button.secondary.fg',
      borderColor: 'button.secondary.border',
      borderWidth: 1,
    },
    hoveredStyle: {
      backgroundColor: 'button.secondary.bg_hover',
      color: 'button.secondary.fg_hover',
      borderColor: 'button.secondary.border_hover',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.secondary.bg',
      color: 'button.secondary.fg',
      borderColor: 'button.secondary.border',
      borderWidth: 1,
    },
    disabledStyle: {
      backgroundColor: 'toggle.button.fg_disabled',
      color: 'fg.disabled',
      borderColor: 'border.disabled_subtle',
      borderWidth: 1,
    },
  },
  TertiaryGray: {
    defaultStyle: {
      color: 'button.tertiary.fg',
    },
    hoveredStyle: {
      backgroundColor: 'button.tertiary.bg_hover',
      color: 'button.tertiary.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  TertiaryColor: {
    defaultStyle: {
      color: 'button.tertiary.color.fg',
    },
    hoveredStyle: {
      backgroundColor: 'button.tertiary.bg_hover',
      color: 'button.tertiary.color.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.color.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  TertiaryDestructive: {
    defaultStyle: {
      color: 'button.tertiary.error.fg',
    },
    hoveredStyle: {
      backgroundColor: 'button.tertiary.error.bg_hover',
      color: 'button.tertiary.error.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.error.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  LinkGray: {
    defaultStyle: {
      color: 'button.tertiary.fg',
    },
    hoveredStyle: {
      color: 'button.tertiary.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  LinkColor: {
    defaultStyle: {
      color: 'button.tertiary.color.fg',
    },
    hoveredStyle: {
      color: 'button.tertiary.color.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.color.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  LinkDestructive: {
    defaultStyle: {
      color: 'button.tertiary.error.fg',
    },
    hoveredStyle: {
      color: 'button.tertiary.error.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.error.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
}

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

type SizeStyle = {
  textVariant: TextVariant
  // FIXME: add untitled ui theme sizing dimensions here instead of number
  paddingHorizontal: number
  paddingVertical: number
  iconGap: number
  iconSize: number
}

export const buttonSizeVariants: { [key in ButtonSize]: SizeStyle } = {
  sm: {
    textVariant: 'SmSemibold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    iconGap: 4,
    iconSize: 20,
  },
  md: {
    textVariant: 'SmSemibold',
    paddingHorizontal: 14,
    paddingVertical: 10,
    iconGap: 4,
    iconSize: 20,
  },
  lg: {
    textVariant: 'MdSemibold',
    paddingHorizontal: 16,
    paddingVertical: 12,
    iconGap: 6,
    iconSize: 20,
  },
  xl: {
    textVariant: 'MdSemibold',
    paddingHorizontal: 20,
    paddingVertical: 16,
    iconGap: 6,
    iconSize: 20,
  },
  xxl: {
    textVariant: 'LgSemibold',
    paddingHorizontal: 22,
    paddingVertical: 18,
    iconGap: 10,
    iconSize: 24,
  },
} as const

const { errorShadow, focusShadow, grayShadow } = theme.dark.shadows

export const getButtonShadowStyle = ({ variant }: { variant: ButtonVariant }) => {
  switch (variant) {
    case 'Primary':
    case 'SecondaryColor':
      return focusShadow
    case 'PrimaryDestructive':
    case 'SecondaryDestructive':
      return errorShadow
    case 'SecondaryGray':
      return grayShadow
    default:
      return {}
  }
}
