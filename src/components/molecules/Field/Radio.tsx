import {
  FormErrorMessage,
  FormLabel,
  Box,
  Touchable,
  Text,
  TouchableRef,
} from '@baca/design-system/components'
import { forwardRef, useCallback, useMemo } from 'react'

import { FieldRadioProps } from './types'

const radioSizes = {
  sm: {
    boxSize: 4,
  },
  md: {
    boxSize: 5,
  },
} as const

export const Radio = forwardRef<TouchableRef, FieldRadioProps>(
  (
    {
      isRequired,
      value,
      radioOptions,
      errorMessage,
      isError,
      size = 'sm',
      onChange,
      label,
      labelStyle,
      isDisabled,
    },
    ref
  ) => {
    const checkboxSize = useMemo(() => radioSizes[size], [size])

    const getBorderColor = useCallback(
      (isSelected: boolean): ColorNames | undefined => {
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

    const renderRadioButtons = useMemo(
      () =>
        radioOptions?.map((item: string, index: number) => {
          return (
            <Touchable
              ref={ref}
              key={index}
              onPress={() => onChange(item)}
              alignItems="center"
              flexDirection="row"
              height={8}
            >
              <Box
                alignItems="center"
                borderRadius={50}
                height={checkboxSize.boxSize}
                width={checkboxSize.boxSize}
                justifyContent="center"
                borderColor={getBorderColor(item === value)}
                borderWidth={item === value ? 5 : 1}
              />
              <Text ml={4}>{item}</Text>
            </Touchable>
          )
        }),
      [radioOptions, ref, checkboxSize.boxSize, getBorderColor, value, onChange]
    )

    return (
      <Box width="100%" mb={2}>
        <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
        {renderRadioButtons}
        <FormErrorMessage errorMessage={errorMessage} />
      </Box>
    )
  }
)
