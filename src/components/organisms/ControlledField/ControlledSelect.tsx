import { useCallback } from 'react'
import { Controller, get, ControllerProps } from 'react-hook-form'

import type { ControlledSelectProps } from './types'
import { Field } from '../../molecules'

import { SelectKey } from '@/design-system'

export const ControlledSelect = <T extends SelectKey>({
  control,
  name,
  errors,
  rules,
  isRequired,
  ...props
}: ControlledSelectProps<T>) => {
  const errorMessage = get(errors, name)?.message

  const renderSelect = useCallback(
    ({ field: { onChange, value } }: Parameters<ControllerProps['render']>[0]) => {
      const handleChange = (newValue: T[]) => {
        if (props.maxSelectedItems === 1) {
          onChange(newValue[0])
        } else {
          onChange(newValue)
        }
      }
      const properValue = Array.isArray(value) ? value : [value]

      return (
        <Field.Select
          errorMessage={errorMessage}
          isError={!!errorMessage}
          selectedItems={properValue}
          onSelectItem={handleChange}
          isRequired={isRequired}
          {...props}
        />
      )
    },
    [errorMessage, props, isRequired]
  )

  return <Controller name={name} control={control} rules={rules} render={renderSelect} />
}
