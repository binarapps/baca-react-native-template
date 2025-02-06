import { useCallback } from 'react'
import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import type { ControlledDatePickerProps } from './types'
import { Field } from '../../molecules'

export const ControlledDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  errors,
  rules,
  children,
  ...props
}: ControlledDatePickerProps<TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderDatePicker = useCallback(
    ({
      field: { onChange, name, ref, value, ...fieldProps },
    }: Parameters<ControllerProps['render']>[0]) => {
      return (
        <Field.DatePicker
          {...props}
          {...fieldProps}
          date={value}
          ref={ref}
          errorMessage={errorMessage}
          onChangeDate={onChange}
        />
      )
    },
    [errorMessage, props]
  )

  return (
    <Controller
      name={name}
      // @ts-expect-error: For some reason, the type of render is not being inferred correctly
      control={control}
      rules={rules}
      render={renderDatePicker}
    />
  )
}
