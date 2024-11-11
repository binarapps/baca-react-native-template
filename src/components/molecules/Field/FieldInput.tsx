import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native'

import type { FieldInputProps } from './types'

import { FormErrorMessage, FormLabel, Input, Box } from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'

export const FieldInput = forwardRef<Partial<TextInput>, FieldInputProps>(
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

    const { layoutProps, restProps: inputProps } = useMemo(() => getLayoutProps(props), [props])

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
        <Input
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
