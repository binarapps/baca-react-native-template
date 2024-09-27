import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import iconJson from 'assets/icomoon/selection.json'
import { StyleProp, ViewStyle } from 'react-native'

import { useTheme } from '@/hooks'
import { IconNames } from '@/types'
import { getColorValue } from '@/utils'

export type IconProps = {
  color?: ColorNames
  name: IconNames
  size: number
  style?: StyleProp<ViewStyle>
}

const IconFont = createIconSetFromIcoMoon(iconJson, 'IcoMoon', 'icomoon.ttf')

export const Icon = ({ color, name, size, style }: IconProps) => {
  const { colors } = useTheme()

  // Using provided color is prevention if user will pass color that is not included in ColorNames
  return (
    <IconFont
      name={name}
      size={size}
      color={getColorValue({ color: color || colors.text.primary, colors })}
      style={style}
    />
  )
}
