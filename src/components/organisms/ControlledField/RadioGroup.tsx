import { Controller, get, ControllerProps } from 'react-hook-form'

import type { ControlledRadioProps } from './types'
import { Field } from '../../molecules'

import { useCallback } from '@/hooks'

export const RadioGroup = <T extends string>({
  name,
  control,
  errors,
  isRequired,
  rules,
  ...props
}: ControlledRadioProps<T>) => {
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

  return <Controller name={name} control={control} rules={rules} render={renderRadio} />
}
