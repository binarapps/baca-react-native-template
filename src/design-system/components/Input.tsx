import {
  useSecurePassword,
  useRef,
  useTheme,
  useState,
  useCallback,
  useImperativeHandle,
  useMemo,
} from '@baca/hooks'
import { convertEmToNumber, getColorValue } from '@baca/utils'
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
      <BoxWithShadow {...{ isFocused, isInvalid }}>
        <Box
          flexDirection="row"
          alignItems="center"
          overflow="hidden"
          borderColor={isInvalid ? 'border.error' : isFocused ? 'border.brand' : 'border.primary'}
          borderRadius={8}
          borderWidth={1}
          backgroundColor={
            isInvalid ? 'bg.error.primary' : isFocused ? 'bg.brand.primary' : 'bg.active'
          }
          bgOpacity={isFocused ? 0.1 : 1}
          {...layoutProps}
        >
          <StyledInput
            ref={_inputRef}
            autoCapitalize="none"
            bg="bg.primary"
            color={isDisabled ? 'text.disabled' : isInvalid ? 'text.error.primary' : 'text.primary'}
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
            secureTextEntry={securePassword}
            selectionColor={colors.text.secondary}
            width="100%"
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {props.type === 'password' ? (
            <Touchable mr={2} onPress={toggleSecurePassword}>
              <Icon
                name={secureTextIconName || iconName}
                color={secureTextIconColor || 'icon.fg.brand'}
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
