import { useTheme } from '@baca/hooks'
import { getColorValue, convertEmToNumber } from '@baca/utils'
import { useMemo, memo, forwardRef, PropsWithoutRef, RefAttributes } from 'react'
import { TextProps as BaseTextProps, Text as BaseText, TextStyle } from 'react-native'

import {
  DisplayVariant,
  displayVariants,
  fontDisplaySize,
  fontTextSize,
  fontWeights,
  TextVariant,
  textVariants,
} from '../../config'
import { generateStyledComponent, generateStyleSheet } from '../../utils'
import { StyledProps } from '../types'

type ConditionalTextProps =
  | {
      type?: 'text' | never
      variant?: TextVariant
    }
  | {
      type: 'display'
      variant?: DisplayVariant
    }

type TypographyProps = {
  fontSize?: TextStyle['fontSize']
  letterSpacing?: LetterSpacings
  lineHeight?: LineHeights
  fontFamily?: Fonts
  fontWeight?: TextStyle['fontWeight']
  color?: ColorNames
  noOfLines?: number
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikeThrough?: boolean
  capitalize?: boolean
  uppercase?: boolean
  lowercase?: boolean
}

type TextProps = StyledProps & BaseTextProps & TypographyProps & ConditionalTextProps

const RawText = memo(
  forwardRef<BaseText, TextProps>(
    (
      {
        bold,
        capitalize,
        color = 'text.brand.primary',
        italic,
        letterSpacing,
        lineHeight,
        noOfLines,
        strikeThrough,
        textDecoration,
        textTransform,
        underline,
        uppercase,
        lowercase,
        style,
        type = 'text',
        variant = 'MdRegular',
        ...props
      },
      ref
    ) => {
      const theme = useTheme()

      const { fontWeight: variantFontWeight, fontSize: variantFontSize } =
        type === 'text' ? textVariants[variant as TextVariant] : displayVariants[variant]

      const fontFamily = props.fontFamily || variantFontWeight
      const fontWeight = bold ? 'bold' : props.fontWeight || fontWeights[variantFontWeight]
      const fontSize =
        props.fontSize ||
        (type === 'text'
          ? fontTextSize[variantFontSize as keyof typeof fontTextSize]
          : fontDisplaySize[variantFontSize])

      const fontFamilyStyle = useMemo<TextStyle>(
        () => ({
          fontFamily: fontFamily ? theme.fonts[fontFamily] : undefined,
        }),
        [theme, fontFamily]
      )

      const finalFontSize = fontSize && typeof fontSize === 'number' ? fontSize : undefined

      const lineHeightStyle = useMemo<TextStyle>(
        () => ({
          lineHeight: lineHeight
            ? convertEmToNumber(theme.lineHeights[lineHeight], finalFontSize)
            : undefined,
        }),
        [theme, lineHeight, finalFontSize]
      )

      const letterSpacingStyle = useMemo<TextStyle>(
        () => ({
          letterSpacing: letterSpacing
            ? convertEmToNumber(theme.letterSpacings[letterSpacing], finalFontSize)
            : undefined,
        }),
        [theme, letterSpacing, finalFontSize]
      )

      const fontSizeStyle = useMemo<TextStyle>(
        () => ({
          fontSize: finalFontSize,
        }),
        [finalFontSize]
      )

      const textColor = useMemo<TextStyle>(
        () => ({
          color: color
            ? getColorValue({ color, colors: theme.colors })
            : theme.colors.text.brand.primary,
        }),
        [theme, color]
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
            capitalize || textTransform === 'capitalize'
              ? 'capitalize'
              : lowercase || textTransform === 'lowercase'
              ? 'lowercase'
              : uppercase || textTransform === 'uppercase'
              ? 'uppercase'
              : 'none',
        }),
        [capitalize, lowercase, uppercase, textTransform]
      )

      const textDecorationStyle = useMemo<TextStyle>(
        () => ({
          textDecorationLine:
            underline || textDecoration === 'underline'
              ? 'underline'
              : strikeThrough || textDecoration === 'line-through'
              ? 'line-through'
              : undefined,
        }),
        [underline, strikeThrough, textDecoration]
      )

      const textStyle = useMemo(
        () =>
          generateStyleSheet<TextStyle>([
            { fontWeight },
            italic && { fontStyle: 'italic' },
            fontFamilyStyle,
            fontSizeStyle,
            letterSpacingStyle,
            lineHeightStyle,
            textAlignmentStyle,
            textColor,
            textDecorationStyle,
            textTransformStyle,
            style,
          ]),
        [
          fontFamilyStyle,
          fontSizeStyle,
          fontWeight,
          italic,
          letterSpacingStyle,
          lineHeightStyle,
          style,
          textAlignmentStyle,
          textColor,
          textDecorationStyle,
          textTransformStyle,
        ]
      )

      return (
        <BaseText
          ref={ref}
          testID="baseText"
          numberOfLines={noOfLines}
          {...props}
          style={textStyle}
        />
      )
    }
  )
)

type TextComposition<T extends string> = React.ForwardRefExoticComponent<
  PropsWithoutRef<TextProps> & RefAttributes<BaseText>
> & {
  [key in T]: React.ForwardRefExoticComponent<PropsWithoutRef<TextProps> & RefAttributes<BaseText>>
}

const Text = generateStyledComponent(RawText) as TextComposition<TextVariant>

const generateTextVariant = (variant: TextVariant) =>
  forwardRef<BaseText, TextProps>((props, ref) => <Text {...{ ...props, ref, variant }} />)

Text.LgBold = generateTextVariant('LgBold')
Text.LgMedium = generateTextVariant('LgMedium')
Text.LgRegular = generateTextVariant('LgRegular')
Text.LgSemibold = generateTextVariant('LgSemibold')
Text.MdBold = generateTextVariant('MdBold')
Text.MdMedium = generateTextVariant('MdMedium')
Text.MdRegular = generateTextVariant('MdRegular')
Text.MdSemibold = generateTextVariant('MdSemibold')
Text.SmBold = generateTextVariant('SmBold')
Text.SmMedium = generateTextVariant('SmMedium')
Text.SmRegular = generateTextVariant('SmRegular')
Text.SmSemibold = generateTextVariant('SmSemibold')
Text.XsBold = generateTextVariant('XsBold')
Text.XsMedium = generateTextVariant('XsMedium')
Text.XsRegular = generateTextVariant('XsRegular')
Text.XsSemibold = generateTextVariant('XsSemibold')
Text.XlBold = generateTextVariant('XlBold')
Text.XlMedium = generateTextVariant('XlMedium')
Text.XlRegular = generateTextVariant('XlRegular')
Text.XlSemibold = generateTextVariant('XlSemibold')

export { Display, Text }

const Display = generateStyledComponent(RawText) as TextComposition<DisplayVariant>

const generateDisplayVariant = (variant: DisplayVariant = 'MdRegular') =>
  forwardRef<BaseText, TextProps>((props, ref) => {
    return <Display {...{ ...props, ref, variant }} type="display" />
  })

Display.LgMedium = generateDisplayVariant('LgMedium')
Display.LgRegular = generateDisplayVariant('LgRegular')
Display.LgSemibold = generateDisplayVariant('LgSemibold')
Display.LgBold = generateDisplayVariant('LgBold')
Display.LgMedium = generateDisplayVariant('LgMedium')
Display.LgRegular = generateDisplayVariant('LgRegular')
Display.LgSemibold = generateDisplayVariant('LgSemibold')
Display.MdBold = generateDisplayVariant('MdBold')
Display.MdMedium = generateDisplayVariant('MdMedium')
Display.MdRegular = generateDisplayVariant('MdRegular')
Display.MdSemibold = generateDisplayVariant('MdSemibold')
Display.SmBold = generateDisplayVariant('SmBold')
Display.SmMedium = generateDisplayVariant('SmMedium')
Display.SmRegular = generateDisplayVariant('SmRegular')
Display.SmSemibold = generateDisplayVariant('SmSemibold')
Display.XsBold = generateDisplayVariant('XsBold')
Display.XsMedium = generateDisplayVariant('XsMedium')
Display.XsRegular = generateDisplayVariant('XsRegular')
Display.XsSemibold = generateDisplayVariant('XsSemibold')
Display.XlBold = generateDisplayVariant('XlBold')
Display.XlMedium = generateDisplayVariant('XlMedium')
Display.XlRegular = generateDisplayVariant('XlRegular')
Display.XlSemibold = generateDisplayVariant('XlSemibold')
Display.XxlBold = generateDisplayVariant('XxlBold')
Display.XxlMedium = generateDisplayVariant('XxlMedium')
Display.XxlRegular = generateDisplayVariant('XxlRegular')
Display.XxlSemibold = generateDisplayVariant('XxlSemibold')
