import { FormErrorMessage, FormLabel, Box, RadioButton } from '@baca/design-system/components'
import { useMemo } from 'react'

import { FieldRadioProps } from './types'

export const Radio = <T extends string>({
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
  radioRef,
}: FieldRadioProps<T>) => {
  const renderRadioButtons = useMemo(
    () =>
      radioOptions?.map((item, index) => {
        return (
          <RadioButton
            ref={radioRef}
            key={index}
            isDisabled={isDisabled}
            isError={isError}
            isSelected={item.value === value}
            onChange={() => onChange(item.value)}
            pb={2}
            label={item.label}
            size={size}
          />
        )
      }),
    [radioOptions, radioRef, isDisabled, isError, value, size, onChange]
  )

  return (
    <Box width="100%" mb={2}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {renderRadioButtons}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
