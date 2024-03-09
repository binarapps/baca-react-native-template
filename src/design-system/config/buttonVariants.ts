export type ButtonVariant =
  | 'Primary'
  | 'SecondaryColor'
  | 'SecondaryGray'
  | 'TertiaryColor'
  | 'TertiaryGray'
  | 'LinkColor'
  | 'LinkGray'

type BtnStyle = {
  backgroundColor?: ColorNames
  borderColor?: ColorNames
  borderWidth?: number
  color?: ColorNames
}

type VariantStyle = {
  defaultStyle: BtnStyle
  disabledStyle: BtnStyle
  focusedStyle: BtnStyle
  hoveredStyle: BtnStyle
}

export const buttonVariants: { [key in ButtonVariant]: VariantStyle } = {
  Primary: {
    hoveredStyle: {
      backgroundColor: 'button.primary.bg_hover',
      color: 'button.primary.fg_hover',
      borderColor: 'button.primary.border',
      borderWidth: 1,
    },
    focusedStyle: {
      backgroundColor: 'button.primary.bg',
      color: 'button.primary.fg',
      borderColor: 'button.primary.border',
      borderWidth: 1,
    },
    defaultStyle: {
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
  SecondaryColor: {
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
    defaultStyle: {
      backgroundColor: 'button.secondary.bg',
      color: 'button.secondary.fg',
      borderColor: 'button.secondary.border',
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
    defaultStyle: {
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
    hoveredStyle: {
      backgroundColor: 'button.tertiary.bg_hover',
      color: 'button.tertiary.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.fg',
    },
    defaultStyle: {
      color: 'button.tertiary.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  TertiaryColor: {
    hoveredStyle: {
      backgroundColor: 'button.tertiary.bg_hover',
      color: 'button.tertiary.color.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.color.fg',
    },
    defaultStyle: {
      color: 'button.tertiary.color.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  LinkGray: {
    hoveredStyle: {
      color: 'button.tertiary.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.fg',
    },
    defaultStyle: {
      color: 'button.tertiary.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
  LinkColor: {
    hoveredStyle: {
      color: 'button.tertiary.color.fg_hover',
    },
    focusedStyle: {
      color: 'button.tertiary.color.fg',
    },
    defaultStyle: {
      color: 'button.tertiary.color.fg',
    },
    disabledStyle: {
      color: 'fg.disabled',
    },
  },
}
