import { Platform, StyleProp, ViewStyle } from 'react-native'

export const makeBigerOnHover = (hovered: boolean): StyleProp<ViewStyle> => {
  return [
    Platform.select({
      web: {
        transitionDuration: '200ms',
        transitionProperty: ['background-color', 'box-shadow', 'transform'],
        transitionTimingFunction: 'cubic-bezier(0.17, 0.17, 0, 1)',
      },
    }),
    hovered && {
      transform: [{ scale: 1.1 }],
    },
  ]
}
