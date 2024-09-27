import { FieldCheckboxProps } from './types'

import { CheckboxButton, Box, FormErrorMessage } from '@/design-system'

export const Checkbox = ({
  isRequired,
  labelStyle,
  isDisabled,
  errorMessage,
  ...props
}: FieldCheckboxProps) => {
  return (
    <Box gap={1}>
      <CheckboxButton {...props} />
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
