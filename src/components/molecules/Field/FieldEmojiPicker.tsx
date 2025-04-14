import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'

import type { FieldEmojiPickerProps } from './types'

import {
  FormErrorMessage,
  FormLabel,
  Box,
  EmojiPicker,
  EmojiPickerRef,
} from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'

export const FieldEmojiPicker = forwardRef<EmojiPickerRef, FieldEmojiPickerProps>(
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
      onChangeEmoji,
      ...props
    },
    ref
  ) => {
    const _emojiPickerRef = useRef<EmojiPickerRef>(null)

    const { layoutProps, restProps: emojiPickerProps } = useMemo(
      () => getLayoutProps(props),
      [props]
    )

    const handleFocus = useCallback(() => {
      _emojiPickerRef?.current?.focus()
    }, [onFocus])

    const handleBlur = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && e && onBlur(e)
        _emojiPickerRef.current?.blur()
      },
      [onBlur]
    )

    useImperativeHandle(
      ref,
      () => ({
        focus: handleFocus,
        blur: handleBlur,
        ..._emojiPickerRef.current,
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
        <EmojiPicker
          isInvalid={isInvalid || Boolean(errorMessage)}
          onChangeEmoji={onChangeEmoji}
          {...emojiPickerProps}
          ref={_emojiPickerRef}
          testID={testID + ':input'}
        />
        <FormErrorMessage {...{ errorMessage }} testId={testID + ':error_message'} />
      </Box>
    )
  }
)
