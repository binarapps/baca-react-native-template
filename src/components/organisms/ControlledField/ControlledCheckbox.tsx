import { Controller, ControllerProps, get } from 'react-hook-form'

import { ControlledCheckboxProps } from './types'

import { Field } from '@/components/molecules'
import { useCallback } from '@/hooks'

export const ControlledCheckbox = ({
  control,
  name,
  rules,
  errors,
  ...props
}: ControlledCheckboxProps) => {
  const errorMessage = get(errors, name)?.message

  const renderCheckbox = useCallback(
    ({ field }: Parameters<ControllerProps['render']>[0]) => (
      <Field>
        <Field.Checkbox
          {...props}
          onChange={field.onChange}
          errorMessage={errorMessage}
          {...(typeof field.value === 'boolean' && { isSelected: field.value })}
        />
      </Field>
    ),
    [errorMessage, props]
  )

  return <Controller name={name} control={control} rules={rules} render={renderCheckbox} />
}
