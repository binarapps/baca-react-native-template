import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import type { ControlledCheckboxGroupProps } from './types'
import { Field } from '../../molecules'

import { useCallback } from '@/hooks'

export const ControlledCheckboxGroup = <
  T extends string,
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  errors,
  isRequired,
  rules,
  items,
  ...props
}: ControlledCheckboxGroupProps<T, TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderCheckbox = useCallback(
    ({ field }: Parameters<ControllerProps['render']>[0]) => (
      <Field>
        <Field.CheckboxGroup
          {...props}
          name={field.name}
          selectedItems={field.value}
          onSelectItem={field.onChange}
          items={items}
          errorMessage={errorMessage}
          isError={!!errorMessage}
          isRequired={isRequired}
        />
      </Field>
    ),
    [errorMessage, isRequired, items, props]
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
