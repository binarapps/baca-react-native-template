import { colorSchemesList } from '@baca/constants'
import createGenericContext from '@baca/utils/createGenericContext'

export type SettingColorSchemeName = (typeof colorSchemesList)[number]
export type ColorSchemeName = Exclude<SettingColorSchemeName, 'system'>

export type ColorSchemeContextType = {
  colorSchemeSetting: SettingColorSchemeName
  colorScheme: ColorSchemeName
  setColorSchemeSetting: (newColorScheme: SettingColorSchemeName) => void
}

export const [useColorScheme, ColorSchemeContextProvider] =
  createGenericContext<ColorSchemeContextType>('ColorSchemeContext')
