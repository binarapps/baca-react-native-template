import { Box, CheckboxButton, FormErrorMessage, FormLabel } from '@baca/design-system/components'
import { useMemo } from 'react'

import { FieldCheckboxGroupProps } from './types'

export const CheckboxGroup = <T extends string>({
  items,
  onSelectItem,
  isInvalid,
  isRequired,
  isDisabled,
  label,
  errorMessage,
  selectedItems,
  labelStyle,
  ...props
}: FieldCheckboxGroupProps<T>) => {
  const renderCheckboxes = useMemo(() => {
    return items.map((item, index) => {
      const handleChange = () => {
        if (Array.isArray(selectedItems)) {
          if (!selectedItems?.includes(item.value)) {
            const newArr = [...selectedItems, item.value]
            onSelectItem(newArr)
          } else {
            const newArr = selectedItems.filter((el) => el !== item.value)
            onSelectItem(newArr)
          }
        }
      }

      return (
        <CheckboxButton
          onChange={handleChange}
          key={index}
          label={item.label}
          {...(Array.isArray(selectedItems) && {
            isSelected: selectedItems?.includes(item.value),
          })}
          {...props}
        />
      )
    })
  }, [items, selectedItems, props, onSelectItem])

  return (
    <Box gap={2} mb={4}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {renderCheckboxes}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
