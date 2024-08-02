import { useCallback } from '@baca/hooks'
import { Controller, ControllerProps, get } from 'react-hook-form'

import type { ControlledCheckboxProps } from './types'
import { Field } from '../../molecules'

export const Checkbox = <T extends string>({
  name,
  control,
  errors,
  isRequired,
  rules,
  ...props
}: ControlledCheckboxProps<T>) => {
  const errorMessage = get(errors, name)?.message

  const renderCheckbox = useCallback(
    ({ field }: Parameters<ControllerProps['render']>[0]) => (
      <Field>
        <Field.Checkbox
          {...props}
          name={field.name}
          value={field.value}
          errorMessage={errorMessage}
          onChange={(newValue) => field.onChange(newValue)}
          isError={!!errorMessage}
          isRequired={isRequired}
        />
      </Field>
    ),
    [errorMessage, isRequired, props]
  )
  return <Controller name={name} control={control} rules={rules} render={renderCheckbox} />
}
