import { CheckboxButton, Box, FormErrorMessage, FormLabel } from '@baca/design-system'

import { FieldCheckboxProps } from './types'

export const Checkbox = ({
  checkboxLablel,
  isRequired,
  label,
  labelStyle,
  onChange,
  disabled,
  errorMessage,
  isChecked,
  size,
  ...props
}: FieldCheckboxProps) => {
  return (
    <Box gap={1}>
      <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />

      <CheckboxButton
        onChange={onChange}
        checkboxLablel={checkboxLablel}
        size={size}
        isChecked={isChecked}
        {...props}
      />
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
