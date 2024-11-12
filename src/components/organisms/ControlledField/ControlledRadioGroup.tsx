import { Controller, get, ControllerProps, FieldValues } from 'react-hook-form'

import type { ControlledRadioProps } from './types'
import { Field } from '../../molecules'

import { useCallback } from '@/hooks'

export const ControlledRadioGroup = <
  T extends string,
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  errors,
  isRequired,
  rules,
  ...props
}: ControlledRadioProps<T, TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderRadio = useCallback(
    ({
      field: { ref, name, value, onChange },
    }: Parameters<ControllerProps['render']>[0]): JSX.Element => (
      <Field.RadioGroup
        {...props}
        radioRef={ref}
        errorMessage={errorMessage}
        isError={!!errorMessage}
        name={name}
        selectedItem={value}
        onSelectItem={onChange}
        isRequired={isRequired}
      />
    ),
    [errorMessage, props, isRequired]
  )

  return (
    <Controller
      name={name}
      // @ts-expect-error: For some reason, the type of render is not being inferred correctly
      control={control}
      rules={rules}
      render={renderRadio}
    />
  )
}
