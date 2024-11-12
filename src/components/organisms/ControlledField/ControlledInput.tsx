import { useCallback } from 'react'
import { Controller, FieldValues, get } from 'react-hook-form'

import type { ControlledInputProps, RenderInputProps } from './types'
import { Field } from '../../molecules'

export const ControlledInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  errors,
  rules,
  children,
  ...props
}: ControlledInputProps<TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderInput = useCallback(
    ({ field: { onChange, name, ref, ...fieldProps } }: RenderInputProps) => (
      <Field.Input
        {...props}
        {...fieldProps}
        ref={ref}
        errorMessage={errorMessage}
        onChangeText={onChange}
      />
    ),
    [errorMessage, props]
  )

  return (
    <Controller
      name={name}
      // @ts-expect-error: For some reason, the type of render is not being inferred correctly
      control={control}
      rules={rules}
      render={renderInput}
    />
  )
}
