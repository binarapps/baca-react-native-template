import { StyleSheet } from 'react-native'

type ButtonVariant = 'Primary' | 'Secondary' | 'Outline' | 'Ghost' | 'Link'
type VariantStyle = {
  pressedStyle: {
    backgroundColor: ColorNames
    color?: ColorNames
    borderColor?: ColorNames
    borderWidth?: number
  }
  notPressedStyle: {
    backgroundColor: ColorNames
    color?: ColorNames
    borderColor?: ColorNames
    borderWidth?: number
  }
  disabledStyle: {
    backgroundColor: ColorNames
    color?: ColorNames
    borderColor?: ColorNames
    borderWidth?: number
  }
}

export const buttonVariants: { [key in ButtonVariant]: VariantStyle } = {
  Primary: {
    pressedStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'button.primary.fg',
    },
    notPressedStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'button.primary.fg',
    },
    disabledStyle: {
      backgroundColor: 'toggle.button.fg_disabled',
      color: 'text.white',
    },
  },
  Secondary: {
    pressedStyle: {
      backgroundColor: 'button.secondary.bg',
      color: 'text.brand.tertiary',
    },
    notPressedStyle: {
      backgroundColor: 'button.secondary.bg',
      color: 'text.brand.tertiary',
    },
    disabledStyle: {
      backgroundColor: 'toggle.button.fg_disabled',
      color: 'text.brand.secondary',
    },
  },
  Outline: {
    pressedStyle: {
      backgroundColor: 'button.tertiary.fg',
      borderColor: 'border.primary',
      borderWidth: StyleSheet.hairlineWidth,
      color: 'text.brand.primary',
    },
    notPressedStyle: {
      backgroundColor: 'button.tertiary.fg',
      borderColor: 'border.primary',
      borderWidth: StyleSheet.hairlineWidth,
      color: 'text.brand.secondary',
    },
    disabledStyle: {
      backgroundColor: 'button.tertiary.fg',
      borderColor: 'border.disabled',
      borderWidth: StyleSheet.hairlineWidth,
      color: 'text.disabled',
    },
  },
  Ghost: {
    pressedStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'text.primary',
    },
    notPressedStyle: {
      backgroundColor: 'button.tertiary.fg',
      color: 'text.primary',
    },
    disabledStyle: {
      backgroundColor: 'button.tertiary.fg',
      color: 'text.brand.secondary',
    },
  },
  Link: {
    pressedStyle: {
      backgroundColor: 'button.tertiary.fg',
      color: 'text.brand.primary',
    },
    notPressedStyle: {
      backgroundColor: 'button.tertiary.fg',
      color: 'text.brand.secondary',
    },
    disabledStyle: {
      backgroundColor: 'button.tertiary.fg',
      color: 'text.disabled',
    },
  },
}
