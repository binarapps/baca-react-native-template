import { CheckboxButton, Box, FormErrorMessage } from '@baca/design-system'

import { FieldCheckboxProps } from './types'

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
