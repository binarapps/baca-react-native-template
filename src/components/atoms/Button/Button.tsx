import {
  useMemo,
  memo,
  useCallback,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native'

import { generateStyledComponent } from '../../utils'
import { Box } from '../Box'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { StyledProps } from '../types'

import { theme } from '~constants'
import { buttonVariants } from '~constants/buttonVariants'
import { useColorScheme } from '~contexts'
import { getColorValue } from '~utils'

export type ButtonProps = StyledProps &
  PressableProps & {
    title?: string
    variant?: ButtonVariant
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
    loaderElement?: JSX.Element
    textStyle?: StyleProp<TextStyle>
  }

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  baseText: {
    color: theme.light.colors.text.primary,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 21,
  },
})

const RawButton = memo(
  forwardRef<View, ButtonProps>(
    (
      {
        variant = 'Primary',
        size = 'md',
        loading,
        disabled,
        leftIcon,
        rightIcon,
        style,
        title,
        children,
        textStyle,
        ...props
      },
      ref
    ) => {
      const { colorScheme } = useColorScheme()
      const { pressedStyle, notPressedStyle, disabledStyle } = useMemo(
        () => buttonVariants[variant],
        [variant]
      )

      const pressedStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: pressedStyle.backgroundColor,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderColor: getColorValue({
            color: pressedStyle.borderColor!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderWidth: pressedStyle.borderWidth,
        }),
        [
          colorScheme,
          pressedStyle.backgroundColor,
          pressedStyle.borderColor,
          pressedStyle.borderWidth,
        ]
      )

      const pressedColorStyle = useMemo<TextStyle>(
        () => ({
          color: getColorValue({
            color: pressedStyle.color!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
        }),
        [colorScheme, pressedStyle.color]
      )

      const notPressedStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: notPressedStyle.backgroundColor,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderColor: getColorValue({
            color: notPressedStyle.borderColor!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderWidth: notPressedStyle.borderWidth,
        }),
        [
          colorScheme,
          notPressedStyle.backgroundColor,
          notPressedStyle.borderColor,
          notPressedStyle.borderWidth,
        ]
      )

      const notPressedColorStyle = useMemo<TextStyle>(
        () => ({
          color: getColorValue({
            color: notPressedStyle.color!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
        }),
        [colorScheme, notPressedStyle.color]
      )

      const disabledStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: disabledStyle.backgroundColor,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderColor: getColorValue({
            color: disabledStyle.borderColor!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderWidth: disabledStyle.borderWidth,
        }),
        [
          colorScheme,
          disabledStyle.backgroundColor,
          disabledStyle.borderColor,
          disabledStyle.borderWidth,
        ]
      )

      const disabledColorStyle = useMemo<TextStyle>(
        () => ({
          color: getColorValue({
            color: disabledStyle.color!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
        }),
        [colorScheme, disabledStyle.color]
      )

      const buttonSizeStyle = useMemo<ViewStyle>(
        () => ({
          paddingHorizontal: size === 'sm' ? 12 : size === 'md' ? 24 : 48,
          minWidth: size === 'sm' ? 64 : size === 'md' ? 128 : 256,
        }),
        [size]
      )

      const pressableStyleFunction = useCallback(
        ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> =>
          StyleSheet.flatten<ViewStyle>([
            styles.baseButton,
            pressed ? pressedStyles : notPressedStyles,
            disabled && disabledStyles,
            loading && disabledStyles,
            buttonSizeStyle,
            typeof style === 'function' ? style({ pressed }) : style,
          ]),
        [pressedStyles, notPressedStyles, loading, buttonSizeStyle, disabled, disabledStyles, style]
      )

      const pressableTextStyleFunction = useCallback(
        ({ pressed }: PressableStateCallbackType) =>
          StyleSheet.flatten([
            styles.baseText,
            pressed ? pressedColorStyle : notPressedColorStyle,
            disabled && disabledColorStyle,
            textStyle,
          ]),
        [pressedColorStyle, notPressedColorStyle, disabled, disabledColorStyle, textStyle]
      )

      const childrenElement = useCallback(
        (props: PressableStateCallbackType) => {
          if (loading) {
            return <Loader type="default" size={24} />
          }
          if (title) {
            return (
              <Text.BodyBold
                allowFontScaling={false}
                style={pressableTextStyleFunction(props)}
                textAlign="center"
              >
                {title}
              </Text.BodyBold>
            )
          }

          if (typeof children === 'string') {
            return (
              <Text.BodyBold
                allowFontScaling={false}
                style={pressableTextStyleFunction(props)}
                textAlign="center"
              >
                {children}
              </Text.BodyBold>
            )
          }
          return children
        },
        [children, loading, pressableTextStyleFunction, title]
      )

      return (
        <Pressable
          ref={ref}
          role="button"
          accessibilityRole="button"
          style={pressableStyleFunction}
          disabled={disabled}
          testID="baseButton"
          {...props}
        >
          {(props: PressableStateCallbackType) => (
            <>
              {leftIcon && <Box mr={8}>{leftIcon}</Box>}
              {childrenElement(props)}
              {rightIcon && <Box ml={8}>{rightIcon}</Box>}
            </>
          )}
        </Pressable>
      )
    }
  )
)
export type ButtonVariant = 'Primary' | 'Secondary' | 'Outline' | 'Ghost' | 'Link'
type ButtonComposition = ForwardRefExoticComponent<
  PropsWithoutRef<ButtonProps> & RefAttributes<View>
> & {
  [key in ButtonVariant]: ForwardRefExoticComponent<
    PropsWithoutRef<ButtonProps> & RefAttributes<View>
  >
}
const Button = generateStyledComponent<ButtonProps, typeof Pressable>(
  RawButton
) as ButtonComposition

const generateButtonVariant = (variant: ButtonVariant) =>
  forwardRef<View, ButtonProps>((props, ref) => <Button variant={variant} {...props} ref={ref} />)

Button.Primary = generateButtonVariant('Primary')
Button.Secondary = generateButtonVariant('Secondary')
Button.Outline = generateButtonVariant('Outline')
Button.Ghost = generateButtonVariant('Ghost')
Button.Link = generateButtonVariant('Link')

export { Button }
