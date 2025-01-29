import RNSlider from '@react-native-community/slider'

import { Box } from './Box'
import { SliderProps } from './types'

export const Slider = ({
  style,
  isDisabled,
  isInvalid,
  value,
  onChangeValue,
  ...props
}: SliderProps) => {
  return (
    <Box flex={1}>
      <RNSlider
        value={value}
        onSlidingComplete={onChangeValue}
        disabled={isDisabled}
        style={style}
        {...props}
      />
    </Box>
  )
}
