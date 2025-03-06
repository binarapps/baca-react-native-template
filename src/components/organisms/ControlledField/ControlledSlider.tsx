import { useCallback } from 'react'
import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import type { ControlledSliderProps } from './types'
import { Field } from '../../molecules'

export const ControlledSlider = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  errors,
  rules,
  children,
  ...props
}: ControlledSliderProps<TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderSlider = useCallback(
    ({
      field: { onChange, name, value, ref: _ref, ...fieldProps },
    }: Parameters<ControllerProps['render']>[0]) => {
      return (
        <Field.Slider
          {...props}
          {...fieldProps}
          value={value}
          errorMessage={errorMessage}
          onChangeValue={onChange}
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
      render={renderSlider}
    />
  )
}
