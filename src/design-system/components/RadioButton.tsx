import { forwardRef, useCallback, useMemo } from 'react'

import { Box } from './Box'
import { Text } from './Text'
import { Touchable, TouchableRef } from './Touchables'
import { RadioButtonProps } from './types'

const radioSizes = {
  sm: {
    boxSize: 4,
  },
  md: {
    boxSize: 5,
  },
} as const

export const RadioButton = forwardRef<TouchableRef, RadioButtonProps>(
  ({ isSelected, isDisabled, isError, onChange, label, size = 'md', pb }, ref) => {
    const checkboxSize = useMemo(() => radioSizes[size], [size])

    const getBorderColor = useCallback(
      (isSelected?: boolean): ColorNames | undefined => {
        if (isDisabled) {
          return 'border.disabled'
        }
        if (isError) {
          return 'border.error'
        }

        if (isSelected) {
          return 'bg.brand.solid'
        }

        return 'border.primary'
      },
      [isDisabled, isError]
    )

    return (
      <Touchable
        ref={ref}
        onPress={() => onChange(!isSelected)}
        alignItems="center"
        flexDirection="row"
        pb={pb}
      >
        <Box
          alignItems="center"
          borderRadius={50}
          height={checkboxSize.boxSize}
          width={checkboxSize.boxSize}
          justifyContent="center"
          borderColor={getBorderColor(isSelected)}
          borderWidth={isSelected ? 5 : 1}
        />
        <Text ml={4}>{label}</Text>
      </Touchable>
    )
  }
)
