import {
  FormErrorMessage,
  FormLabel,
  Box,
  TouchableRef,
  RadioButton,
} from '@baca/design-system/components'
import { forwardRef, useMemo } from 'react'

import { FieldRadioProps } from './types'

export const Radio = forwardRef<TouchableRef, FieldRadioProps>(
  (
    {
      isRequired,
      value,
      radioOptions,
      errorMessage,
      isError,
      size = 'md',
      onChange,
      label,
      labelStyle,
      isDisabled,
    },
    ref
  ) => {
    const renderRadioButtons = useMemo(
      () =>
        radioOptions?.map((item: string, index: number) => {
          return (
            <RadioButton
              ref={ref}
              key={index}
              isDisabled={isDisabled}
              isError={isError}
              isSelected={item === value}
              onChange={() => onChange(item)}
              pb={2}
              label={item}
              size={size}
            />
          )
        }),
      [radioOptions, ref, isDisabled, isError, value, size, onChange]
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
