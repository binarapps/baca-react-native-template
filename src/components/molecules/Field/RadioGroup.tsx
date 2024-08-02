import { FormErrorMessage, FormLabel, Box, Radio } from '@baca/design-system/components'
import { useMemo } from 'react'

import { RadioGroupProps } from './types'

export const RadioGroup = <T extends string>({
  selectedItem,
  items,
  onSelectItem,
  isRequired,
  errorMessage,
  isError,
  size = 'md',
  label,
  labelStyle,
  isDisabled,
  radioRef,
}: RadioGroupProps<T>) => {
  const renderRadioButtons = useMemo(
    () =>
      items?.map((item, index) => {
        return (
          <Radio
            ref={radioRef}
            key={index}
            isDisabled={isDisabled}
            isError={isError}
            isSelected={item.value === selectedItem}
            onChange={() => onSelectItem(item.value)}
            pb={2}
            label={item.label}
            size={size}
          />
        )
      }),
    [items, radioRef, isDisabled, isError, selectedItem, size, onSelectItem]
  )

  return (
    <Box width="100%" mb={2}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {renderRadioButtons}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
