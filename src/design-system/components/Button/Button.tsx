import { useColorScheme } from '@baca/contexts'
import { getColorValue } from '@baca/utils'
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

import { ButtonVariant, buttonVariants, theme } from '../../config'
import { generateStyledComponent } from '../../utils'
import { Box } from '../Box'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { StyledProps } from '../types'

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
      const { hoveredStyle, defaultStyle, disabledStyle } = useMemo(
        () => buttonVariants[variant],
        [variant]
      )

      const hoveredStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: hoveredStyle.backgroundColor || 'transparent',
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderColor: getColorValue({
            color: hoveredStyle.borderColor!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderWidth: hoveredStyle.borderWidth,
        }),
        [
          colorScheme,
          hoveredStyle.backgroundColor,
          hoveredStyle.borderColor,
          hoveredStyle.borderWidth,
        ]
      )

      const hoverColorStyle = useMemo<TextStyle>(
        () => ({
          color: getColorValue({
            color: hoveredStyle.color!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
        }),
        [colorScheme, hoveredStyle.color]
      )

      const defaultStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: defaultStyle.backgroundColor || 'transparent',
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderColor: getColorValue({
            color: defaultStyle.borderColor!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
          borderWidth: defaultStyle.borderWidth,
        }),
        [
          colorScheme,
          defaultStyle.backgroundColor,
          defaultStyle.borderColor,
          defaultStyle.borderWidth,
        ]
      )

      const defaultColorStyle = useMemo<TextStyle>(
        () => ({
          color: getColorValue({
            color: defaultStyle.color!,
            colors: colorScheme === 'light' ? theme.light.colors : theme.dark.colors,
          }),
        }),
        [colorScheme, defaultStyle.color]
      )

      const disabledStyles = useMemo<ViewStyle>(
        () => ({
          backgroundColor: getColorValue({
            color: disabledStyle.backgroundColor || 'transparent',
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
            pressed ? hoveredStyles : defaultStyles,
            disabled && disabledStyles,
            loading && disabledStyles,
            buttonSizeStyle,
            typeof style === 'function' ? style({ pressed }) : style,
          ]),
        [hoveredStyles, defaultStyles, disabled, disabledStyles, loading, buttonSizeStyle, style]
      )

      const pressableTextStyleFunction = useCallback(
        ({ pressed }: PressableStateCallbackType) =>
          StyleSheet.flatten([
            styles.baseText,
            pressed ? hoverColorStyle : defaultColorStyle,
            disabled && disabledColorStyle,
            textStyle,
          ]),
        [hoverColorStyle, defaultColorStyle, disabled, disabledColorStyle, textStyle]
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
          role="button"
          accessibilityRole="button"
          style={pressableStyleFunction}
          testID="baseButton"
          {...{ disabled, ref, ...props }}
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
Button.SecondaryColor = generateButtonVariant('SecondaryColor')
Button.SecondaryGray = generateButtonVariant('SecondaryGray')
Button.TertiaryColor = generateButtonVariant('TertiaryColor')
Button.TertiaryGray = generateButtonVariant('TertiaryGray')
Button.LinkColor = generateButtonVariant('LinkColor')
Button.LinkGray = generateButtonVariant('LinkGray')

export { Button }
