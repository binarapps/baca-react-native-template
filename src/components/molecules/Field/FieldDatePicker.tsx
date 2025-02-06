import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'

import type { FieldDatePickerProps } from './types'

import {
  FormErrorMessage,
  FormLabel,
  Box,
  DatePicker,
  DatePickerRef,
} from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'

export const FieldDatePicker = forwardRef<DatePickerRef, FieldDatePickerProps>(
  (
    {
      errorMessage,
      isInvalid,
      isRequired,
      label,
      labelStyle,
      onBlur,
      onFocus,
      testID,
      onChangeDate,
      ...props
    },
    ref
  ) => {
    const _datePickerRef = useRef<DatePickerRef>(null)

    const { layoutProps, restProps: datePickerProps } = useMemo(
      () => getLayoutProps(props),
      [props]
    )

    const handleFocus = useCallback(() => {
      _datePickerRef?.current?.focus()
    }, [onFocus])

    const handleBlur = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && e && onBlur(e)
        _datePickerRef.current?.blur()
      },
      [onBlur]
    )

    useImperativeHandle(
      ref,
      () => ({
        focus: handleFocus,
        blur: handleBlur,
        ..._datePickerRef.current,
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
        <DatePicker
          isInvalid={isInvalid || Boolean(errorMessage)}
          onChangeDate={onChangeDate}
          {...datePickerProps}
          ref={_datePickerRef}
          testID={testID + ':input'}
        />
        <FormErrorMessage {...{ errorMessage }} testId={testID + ':error_message'} />
      </Box>
    )
  }
)
