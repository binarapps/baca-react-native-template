import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import { ControlledCheckboxProps } from './types'

import { Field } from '@/components/molecules'
import { useCallback } from '@/hooks'

export const ControlledCheckbox = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  errors,
  ...props
}: ControlledCheckboxProps<TFieldValues>) => {
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

  return (
    <Controller
      name={name}
      // @ts-expect-error: For some reason, the type of render is not being inferred correctly
      control={control}
      rules={rules}
      render={renderCheckbox}
    />
  )
}
