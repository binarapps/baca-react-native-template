import { useMemo } from 'react'

import { FieldRadioGroupProps } from './types'

import { FormErrorMessage, FormLabel, Box, RadioButton } from '@/design-system/components'

export const FieldRadioGroup = <T extends string>({
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
}: FieldRadioGroupProps<T>) => {
  const renderRadioButtons = useMemo(
    () =>
      items?.map((item, index) => {
        return (
          <RadioButton
            ref={radioRef}
            key={index}
            isDisabled={isDisabled}
            isError={isError}
            isSelected={item.value === selectedItem}
            onChange={() => onSelectItem(item.value)}
            label={item.label}
            size={size}
          />
        )
      }),
    [items, radioRef, isDisabled, isError, selectedItem, size, onSelectItem]
  )

  return (
    <Box width="100%" gap={2} mb={2}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {renderRadioButtons}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}

FieldRadioGroup.displayName = 'RadioGroup'
