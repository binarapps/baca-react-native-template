import { theme } from '@baca/constants/theme'
import { themeColors } from '@baca/constants/colors'

declare global {
  // THEME
  type AppTheme = typeof theme.light

  // FONTS
  type FontSizes = keyof AppTheme['fontSizes']
  type LetterSpacings = keyof AppTheme['letterSpacings']
  type LineHeights = keyof AppTheme['lineHeights']
  type FontWeights = keyof AppTheme['fontWeights']
  type Fonts = keyof AppTheme['fonts']

  // COLORS
  type Colors = typeof themeColors.lightMode | typeof themeColors.darkMode

  export type ColorNames = NestedKeys<Colors>

  type Sizes = AppTheme['sizes']
  type SizeKeys = keyof Sizes
}
