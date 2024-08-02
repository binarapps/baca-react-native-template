import {
  Box,
  Checkbox as CustomCheckbox,
  FormErrorMessage,
  FormLabel,
  Spacer,
} from '@baca/design-system/components'
import { Fragment, useMemo } from 'react'

import { FieldCheckboxProps } from './types'

export const Checkbox = <T extends string>({
  isInvalid,
  isRequired,
  isDisabled,
  label,
  errorMessage,
  labelStyle,
  checkboxes,
  onChange,
  value,
  checkboxText,
  ...props
}: FieldCheckboxProps<T>) => {
  const renderCheckboxes = useMemo(() => {
    return checkboxes?.map((item, index) => {
      const handleChange = () => {
        if (Array.isArray(value)) {
          if (!value?.includes(item.value)) {
            const newArr = [...value, item.value]
            onChange(newArr)
          } else {
            const newArr = value.filter((el) => el !== item.value)
            onChange(newArr)
          }
        }
      }

      return (
        <Fragment key={index}>
          <CustomCheckbox
            onChange={handleChange}
            key={index}
            checkboxText={item.label}
            value={value}
            {...(Array.isArray(value) && { isChecked: value?.includes(item.value) })}
            {...props}
          />
          <Spacer y={2} />
        </Fragment>
      )
    })
  }, [checkboxes, value, props, onChange])

  return (
    <Box gap={1}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />
      {checkboxes ? (
        renderCheckboxes
      ) : (
        <CustomCheckbox
          onChange={onChange}
          value={value}
          checkboxText={checkboxText}
          {...(typeof value === 'boolean' && { isChecked: value })}
          {...props}
        />
      )}
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
