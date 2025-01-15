import { forwardRef } from 'react'
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native'

import { Box } from './Box'
import { BoxWithShadow } from './BoxWithShadow'
import { Icon } from './Icon'
import { Touchable } from './Touchables/Touchable'
import type { InputProps } from './types'
import { fontTextSize, fontWeights } from '../config'
import { generateStyleSheet, generateStyledSystem } from '../utils'

import { getLayoutProps } from '@/design-system/utils/getLayoutProps'
import {
  useSecurePassword,
  useRef,
  useTheme,
  useState,
  useCallback,
  useImperativeHandle,
  useMemo,
} from '@/hooks'
import { convertEmToNumber, getColorValue } from '@/utils'

const StyledInput = forwardRef<TextInput, InputProps>((props, ref) => {
  const { colors, fonts, lineHeights } = useTheme()

  const fontSize = fontTextSize[props.fontSize || 'sm']
  const fontWeight = fontWeights[props.fontWeight || 'Regular']
  const fontFamily = fonts[props.fontFamily || 'Regular']

  const lineHeightStyle = useMemo<TextStyle>(
    () => ({
      lineHeight: props.lineHeight
        ? convertEmToNumber(lineHeights[props.lineHeight], fontSize)
        : undefined,
    }),
    [lineHeights, props.lineHeight, fontSize]
  )

  const textColorStyle = useMemo<TextStyle>(
    () => ({
      color: props.color ? getColorValue({ color: props.color, colors }) : colors.text.primary,
    }),
    [colors, props.color]
  )

  const textAlignmentStyle = useMemo<TextStyle>(
    () => ({
      textAlign: props.textAlign,
    }),
    [props.textAlign]
  )

  const textTransformStyle = useMemo<TextStyle>(
    () => ({
      textTransform:
        props.capitalize || props.textTransform === 'capitalize'
          ? 'capitalize'
          : props.lowercase || props.textTransform === 'lowercase'
          ? 'lowercase'
          : props.uppercase || props.textTransform === 'uppercase'
          ? 'uppercase'
          : 'none',
    }),
    [props.capitalize, props.lowercase, props.uppercase, props.textTransform]
  )

  const textDecorationStyle = useMemo<TextStyle>(
    () => ({
      textDecorationLine:
        props.underline || props.textDecoration === 'underline'
          ? 'underline'
          : props.strikeThrough || props.textDecoration === 'line-through'
          ? 'line-through'
          : undefined,
    }),
    [props.underline, props.strikeThrough, props.textDecoration]
  )

  const fontWeightStyle = useMemo<TextStyle>(
    () => ({
      fontWeight: (props.bold && fontWeights.Bold) || fontWeight,
    }),
    [fontWeight, props.bold]
  )

  const fontFamilyStyle = useMemo<TextStyle>(
    () => ({
      fontFamily,
    }),
    [fontFamily]
  )

  const fontSizeStyle = useMemo<TextStyle>(
    () => ({
      fontSize,
    }),
    [fontSize]
  )

  const inputTextStyle = useMemo<TextStyle>(
    () =>
      generateStyleSheet<TextStyle>([
        props.italic && { fontStyle: 'italic' },
        fontFamilyStyle,
        fontSizeStyle,
        fontWeightStyle,
        textDecorationStyle,
        textTransformStyle,
        textAlignmentStyle,
        textColorStyle,
        lineHeightStyle,
      ]),
    [
      fontFamilyStyle,
      fontSizeStyle,
      fontWeightStyle,
      lineHeightStyle,
      props.italic,
      textAlignmentStyle,
      textColorStyle,
      textDecorationStyle,
      textTransformStyle,
    ]
  )
  const style = generateStyledSystem(props, colors)

  return <TextInput {...props} style={[inputTextStyle, style, props.style]} ref={ref} />
})

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      isDisabled,
      isInvalid,
      secureTextIconName,
      secureTextIconColor,
      onFocus,
      onBlur,
      lineHeight,
      secureTextIconSize = 24,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme()

    const [isFocused, setIsFocused] = useState(false)
    const _inputRef = useRef<TextInput>(null)
    const { securePassword, toggleSecurePassword, iconName } = useSecurePassword(props.type)

    const { layoutProps, restProps: inputProps } = useMemo(() => getLayoutProps(props), [props])

    const handleFocus = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (isDisabled) return
        _inputRef.current?.focus()
        setIsFocused(true)
        if (onFocus && e) onFocus(e)
      },
      [isDisabled, onFocus]
    )

    const handleBlur = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        _inputRef.current?.blur()
        setIsFocused(false)
        if (onBlur && e) onBlur(e)
      },
      [setIsFocused, onBlur]
    )

    useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => handleFocus(),
          blur: () => handleBlur(),
          ..._inputRef.current,
        } as unknown as TextInput),
      [handleBlur, handleFocus]
    )

    return (
      <BoxWithShadow {...{ isFocused, isInvalid, collapsable: false }}>
        <Box
          collapsable={false}
          alignItems="center"
          borderColor={
            isDisabled
              ? 'border.disabled'
              : isInvalid
              ? 'border.error'
              : isFocused
              ? 'border.brand'
              : 'border.primary'
          }
          bg={isDisabled ? 'bg.disabled_subtle' : 'bg.primary'}
          borderRadius={8}
          borderWidth={1}
          flexDirection="row"
          overflow="hidden"
          {...layoutProps}
        >
          <StyledInput
            autoCapitalize="none"
            color={isDisabled ? 'text.disabled' : 'text.primary'}
            cursorColor={colors.text.placeholder}
            {...Platform.select({
              default: { editable: !isDisabled },
              web: { disabled: isDisabled },
            })}
            fontFamily="Regular"
            fontSize="md"
            fontWeight="Regular"
            height="100%"
            placeholder="Enter your email"
            placeholderTextColor={colors.text.placeholder}
            px={3}
            py={2}
            ref={_inputRef}
            secureTextEntry={securePassword}
            selectionColor={colors.text.secondary}
            flex={1}
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {props.type === 'password' ? (
            <Touchable right={0} pr={2} onPress={toggleSecurePassword}>
              <Icon
                name={secureTextIconName || iconName}
                color={secureTextIconColor || 'fg.brand.primary'}
                size={secureTextIconSize}
              />
            </Touchable>
          ) : (
            props.rightElement
          )}
        </Box>
      </BoxWithShadow>
    )
  }
)
