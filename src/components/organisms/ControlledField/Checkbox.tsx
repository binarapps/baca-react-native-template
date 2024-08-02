import { CheckboxButton, Box, FormErrorMessage, FormLabel } from '@baca/design-system'
import { useCallback } from '@baca/hooks'
import { Controller, ControllerProps, get } from 'react-hook-form'

import { ControlledCheckboxProps } from './types'

export const Checkbox = ({
  control,
  name,
  rules,
  checkboxLablel,
  isRequired,
  label,
  labelStyle,
  disabled,
  errors,
  isError,
  pb,
  size,
  ...props
}: ControlledCheckboxProps) => {
  const errorMessage = get(errors, name)?.message

  const renderCheckbox = useCallback(
    ({ field }: Parameters<ControllerProps['render']>[0]) => (
      <Box gap={1}>
        <FormLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />

        <CheckboxButton
          onChange={field.onChange}
          checkboxLablel={checkboxLablel}
          size={size}
          {...(typeof field.value === 'boolean' && { isChecked: field.value })}
          {...props}
        />
        <FormErrorMessage errorMessage={errorMessage} />
      </Box>
    ),
    [checkboxLablel, errorMessage, isRequired, label, labelStyle, props, size]
  )

  return <Controller name={name} control={control} rules={rules} render={renderCheckbox} />
}
