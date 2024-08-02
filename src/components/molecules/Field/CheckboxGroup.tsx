import {
  Box,
  CheckboxButton,
  FormErrorMessage,
  FormLabel,
  Spacer,
} from '@baca/design-system/components'
import { Fragment, useMemo } from 'react'

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
        <Fragment key={index}>
          <CheckboxButton
            onChange={handleChange}
            key={index}
            checkboxLablel={item.label}
            {...(Array.isArray(selectedItems) && {
              isChecked: selectedItems?.includes(item.value),
            })}
            {...props}
          />
          <Spacer y={2} />
        </Fragment>
      )
    })
  }, [items, selectedItems, props, onSelectItem])

  return (
    <Box gap={1}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {renderCheckboxes}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
