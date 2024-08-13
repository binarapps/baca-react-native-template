import { useCallback } from '@baca/hooks'
import { Controller, ControllerProps, get } from 'react-hook-form'

import type { ControlledCheckboxGroupProps } from './types'
import { Field } from '../../molecules'

export const CheckboxGroup = <T extends string>({
  name,
  control,
  errors,
  isRequired,
  rules,
  items,
  ...props
}: ControlledCheckboxGroupProps<T>) => {
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
  return <Controller name={name} control={control} rules={rules} render={renderCheckbox} />
}
