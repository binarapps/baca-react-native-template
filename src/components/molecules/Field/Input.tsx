import {
  FormErrorMessage,
  FormLabel,
  Input as BaseInput,
  Box,
} from '@baca/design-system/components'
import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native'

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
      testID,
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
      <Box width="100%" gap={1} mb={2} {...layoutProps}>
        <FormLabel
          {...{ isRequired, label, labelStyle }}
          testID={testID + ':label'}
          onLabelPress={handleFocus}
        />
        <BaseInput
          isInvalid={isInvalid || Boolean(errorMessage)}
          {...inputProps}
          ref={_inputRef}
          testID={testID + ':input'}
        />
        <FormErrorMessage {...{ errorMessage }} testId={testID + ':error_message'} />
      </Box>
    )
  }
)
