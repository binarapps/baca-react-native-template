import { useCallback } from '@baca/hooks'
import { Controller, get, ControllerProps } from 'react-hook-form'

import type { ControlledRadioProps } from './types'
import { Field } from '../../molecules'

export const Radio = <T extends string>({
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
      <Field.Radio
        {...props}
        radioRef={ref}
        errorMessage={errorMessage}
        isError={!!errorMessage}
        name={name}
        value={value}
        onChange={onChange}
        isRequired={isRequired}
      />
    ),
    [errorMessage, props, isRequired]
  )

  return <Controller name={name} control={control} rules={rules} render={renderRadio} />
}
