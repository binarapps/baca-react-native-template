import { Field } from '@baca/components/molecules'
import { useCallback } from '@baca/hooks'
import { Controller, ControllerProps, get } from 'react-hook-form'

import { ControlledCheckboxProps } from './types'

export const Checkbox = ({ control, name, rules, errors, ...props }: ControlledCheckboxProps) => {
  const errorMessage = get(errors, name)?.message

  const renderCheckbox = useCallback(
    ({ field }: Parameters<ControllerProps['render']>[0]) => (
      <Field>
        <Field.Checkbox
          {...props}
          onChange={field.onChange}
          errorMessage={errorMessage}
          {...(typeof field.value === 'boolean' && { isChecked: field.value })}
        />
      </Field>
    ),
    [errorMessage, props]
  )

  return <Controller name={name} control={control} rules={rules} render={renderCheckbox} />
}
