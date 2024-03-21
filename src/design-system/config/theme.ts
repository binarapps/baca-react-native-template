import type { Theme } from '@react-navigation/native'

import { themeColors } from './colors'

export const palette = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  red: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  green: {
    50: '#e1ffe1',
    100: '#b1ffb1',
    200: '#7fff7f',
    300: '#4cff4c',
    400: '#1aff1a',
    500: '#00e600',
    600: '#00b400',
    700: '#008200',
    800: '#005000',
    900: '#002100',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  yellow: {
    50: '#fffde1',
    100: '#fffbb1',
    200: '#fff87f',
    300: '#fff54c',
    400: '#fff21a',
    500: '#ffe900',
    600: '#b4b400',
    700: '#828200',
    800: '#505000',
    900: '#1a1a00',
  },
  gray: {
    50: '#f2f2f2',
    100: '#e6e6e6',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a',
  },
}

export const colors = {
  primary: palette.blue['500'],
  primaryLight: palette.blue['300'],
  primaryDark: palette.blue['700'],
  secondary: palette.red['500'],
  secondaryLight: palette.red['300'],
  secondaryDark: palette.red['700'],
  tertiary: palette.green['500'],
  tertiaryLight: palette.green['100'],
  tertiaryDark: palette.green['900'],
  success: palette.green['400'],
  warning: palette.yellow['500'],
  danger: palette.red['500'],
  info: palette.blue['100'],
  light: palette.gray['50'],
  dark: palette.black,
  white: palette.white,
  black: palette.black,
  transparent: 'transparent',
}

export const ProjectColors = {
  //CONFIG: Add your project specific colors here
  modalBackground: 'rgba(0, 0, 0, 0.5)',
}
export type TextFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DisplayFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type FontWeight = 'Regular' | 'Medium' | 'Semibold' | 'Bold'

export const fontTextSize: { [key in TextFontSize]: number } = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
} as const

export const fontDisplaySize: { [key in DisplayFontSize]: number } = {
  xs: 24,
  sm: 30,
  md: 36,
  lg: 48,
  xl: 60,
  xxl: 72,
} as const

export const fontWeights: { [key in FontWeight]: '400' | '500' | '600' | '700' } = {
  Regular: '400',
  Medium: '500',
  Semibold: '600',
  Bold: '700',
} as const

export const fonts: { [key in FontWeight]: string } = {
  Regular: 'Inter_Regular',
  Medium: 'Inter_Medium',
  Semibold: 'Inter_Semibold',
  Bold: 'Inter_Bold',
} as const

export const scale = fontTextSize.md

export const letterSpacings = {
  xs: '-0.05em',
  sm: '-0.025em',
  md: 0,
  lg: '0.025em',
  xl: '0.05em',
  '2xl': '0.1em',
} as const

export const lineHeights = {
  '2xs': '1em',
  xs: '1.125em',
  sm: '1.25em',
  md: '1.375em',
  lg: '1.5em',
  xl: '1.75em',
  '2xl': '2em',
  '3xl': '2.5em',
  '4xl': '3em',
  '5xl': '4em',
} as const

export const size = {
  '0': 0,
  '0.5': 0.125 * scale,
  '1': 0.25 * scale,
  '1.5': 6,
  '1/2': '50%',
  '1/3': '33.333%',
  '1/4': '25%',
  '1/5': '20%',
  '1/6': '16.666%',
  '10': 2.5 * scale,
  '12': 3 * scale,
  '16': 4 * scale,
  '2': 0.5 * scale,
  '2.5': 10,
  '2/3': '66.666%',
  '2/4': '50%',
  '2/5': '40%',
  '2/6': '33.333%',
  '20': 5 * scale,
  '24': 6 * scale,
  '3': 0.75 * scale,
  '3.5': 14,
  '3/4': '75%',
  '3/5': '60%',
  '3/6': '50%',
  '32': 8 * scale,
  '4': scale,
  '4/5': '80%',
  '4/6': '66.666%',
  '40': 10 * scale,
  '48': 12 * scale,
  '5': 1.25 * scale,
  '5/6': '83.333%',
  '56': 14 * scale,
  '6': 1.5 * scale,
  '64': 16 * scale,
  '7': 1.75 * scale,
  '72': 18 * scale,
  '8': 2 * scale,
  '80': 20 * scale,
  '9': 2.25 * scale,
  '96': 24 * scale,
  full: '100%',
  px: 1,
} as const

export const breakpoints = {
  mobile: 0,
  tablet: 568,
  desktop: 1024,
}

export const shadows = {
  '0': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  '1': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  '2': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  '3': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  '4': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  '5': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  '6': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  '7': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  '8': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  '9': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  errorShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: themeColors.primitives.Error[500],
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  focusShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: themeColors.primitives.Brand[500],
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  grayShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: themeColors.primitives['Gray (light mode)'][400],
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
}

export const _appTheme = {
  breakpoints,
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  fonts,
  letterSpacings,
  lineHeights,
  fontWeights,
  size,
  shadows,
}

export const theme = {
  light: {
    ..._appTheme,
    colors: { ...themeColors.primitives, ...themeColors.lightMode },
  },
  dark: {
    ..._appTheme,
    colors: { ...themeColors.primitives, ...themeColors.darkMode },
  },
}

export const lightNavigationTheme: Theme = {
  colors: {
    background: themeColors.lightMode.bg.primary,
    border: 'transparent',
    card: themeColors.lightMode.bg.primary,
    text: themeColors.lightMode.alpha.black[70],
    notification: themeColors.lightMode.avatar.bg,
    primary: themeColors.lightMode.utility.purple[500],
  },
  dark: false,
}

export const darkNavigationTheme: Theme = {
  colors: {
    background: themeColors.darkMode.bg.primary,
    border: 'transparent',
    card: themeColors.darkMode.bg.primary,
    text: themeColors.darkMode.alpha.black[70],
    notification: themeColors.darkMode.avatar.bg,
    primary: themeColors.darkMode.utility.purple[500],
  },
  dark: true,
}

export const navigationTheme = {
  light: lightNavigationTheme,
  dark: darkNavigationTheme,
}
