import { useCallback } from 'react'
import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import type { ControlledEmojiPickerProps } from './types'
import { Field } from '../../molecules'

export const ControlledEmojiPicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  errors,
  rules,
  children,
  ...props
}: ControlledEmojiPickerProps<TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderEmojiPicker = useCallback(
    ({
      field: { onChange, name, ref, value, ...fieldProps },
    }: Parameters<ControllerProps['render']>[0]) => {
      return (
        <Field.EmojiPicker
          {...props}
          {...fieldProps}
          emoji={value}
          ref={ref}
          errorMessage={errorMessage}
          onChangeEmoji={onChange}
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
      render={renderEmojiPicker}
    />
  )
}
