import {
  FormErrorMessage,
  FormLabel,
  Input as BaseInput,
  Box,
} from '@baca/design-system/components'
import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, Pressable, TextInput, TextInputFocusEventData } from 'react-native'

import type { FieldInputProps } from './types'

const layoutPropsKeys = [
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'my',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'py',
]

export const Input = forwardRef<Partial<TextInput>, FieldInputProps>(
  (
    {
      errorMessage,
      helperText,
      isInvalid,
      isRequired,
      label,
      labelStyle,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const _inputRef = useRef<TextInput>(null)

    const layoutProps = useMemo(
      () =>
        Object.fromEntries(Object.entries(props).filter(([key]) => layoutPropsKeys.includes(key))),
      [props]
    )
    const inputProps = useMemo(
      () =>
        Object.fromEntries(Object.entries(props).filter(([key]) => !layoutPropsKeys.includes(key))),
      [props]
    )

    const handleFocus = useCallback(() => {
      onFocus?.()
      _inputRef?.current?.focus()
    }, [onFocus])

    const handleBlur = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && e && onBlur(e)
        _inputRef.current?.blur()
      },
      [onBlur]
    )

    useImperativeHandle(
      ref,
      () => ({
        focus: handleFocus,
        blur: handleBlur,
        ..._inputRef.current,
      }),
      [handleBlur, handleFocus]
    )

    return (
      <Box {...layoutProps} width="100%" mb="2">
        <Pressable onPress={handleFocus}>
          <FormLabel {...{ isRequired, label, labelStyle }} />
          <BaseInput
            isInvalid={isInvalid || Boolean(errorMessage)}
            {...inputProps}
            ref={_inputRef}
          />
          <FormErrorMessage {...{ errorMessage }} />
        </Pressable>
      </Box>
    )
  }
)
