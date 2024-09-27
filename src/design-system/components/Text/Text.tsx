import { useMemo, memo, forwardRef, PropsWithoutRef, RefAttributes } from 'react'
import { TextProps as BaseTextProps, Text as BaseText, TextStyle } from 'react-native'

import {
  DisplayVariant,
  displayVariants,
  fontDisplaySize,
  fontTextSize,
  FontWeight,
  fontWeights,
  TextVariant,
  textVariants,
} from '../../config'
import { generateStyledComponent, generateStyleSheet } from '../../utils'
import { StyledProps } from '../types'

import { useTheme } from '@/hooks'
import { getColorValue, convertEmToNumber } from '@/utils'

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
        color,
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

      const { fontWeight: variantFontWeight, fontSize: variantFontSize } = useMemo(
        () => (type === 'text' ? textVariants[variant as TextVariant] : displayVariants[variant]),
        [type, variant]
      )

      const fontFamily = useMemo(
        (): FontWeight => props.fontFamily || variantFontWeight,
        [props.fontFamily, variantFontWeight]
      )
      const fontWeight = useMemo(
        (): TextStyle['fontWeight'] =>
          bold ? 'bold' : props.fontWeight || fontWeights[variantFontWeight],
        [bold, props.fontWeight, variantFontWeight]
      )
      const fontSize = useMemo(
        (): number =>
          props.fontSize ||
          (type === 'text'
            ? fontTextSize[variantFontSize as keyof typeof fontTextSize]
            : fontDisplaySize[variantFontSize]),
        [props.fontSize, type, variantFontSize]
      )

      const fontFamilyStyle = useMemo<TextStyle>(
        () => ({
          fontFamily: fontFamily ? theme.fonts[variantFontWeight] : undefined,
        }),
        [fontFamily, theme.fonts, variantFontWeight]
      )

      const finalFontSize = useMemo(
        () => (fontSize && typeof fontSize === 'number' ? fontSize : undefined),
        [fontSize]
      )

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
          color: color ? getColorValue({ color, colors: theme.colors }) : theme.colors.text.primary,
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

      return <BaseText ref={ref} numberOfLines={noOfLines} {...props} style={textStyle} />
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
Text.LgBold.displayName = 'Text.LgBold'

Text.LgMedium = generateTextVariant('LgMedium')
Text.LgMedium.displayName = 'Text.LgMedium'

Text.LgRegular = generateTextVariant('LgRegular')
Text.LgRegular.displayName = 'Text.LgRegular'

Text.LgSemibold = generateTextVariant('LgSemibold')
Text.LgSemibold.displayName = 'Text.LgSemibold'

Text.MdBold = generateTextVariant('MdBold')
Text.MdBold.displayName = 'Text.MdBold'

Text.MdMedium = generateTextVariant('MdMedium')
Text.MdMedium.displayName = 'Text.MdMedium'

Text.MdRegular = generateTextVariant('MdRegular')
Text.MdRegular.displayName = 'Text.MdRegular'

Text.MdSemibold = generateTextVariant('MdSemibold')
Text.MdSemibold.displayName = 'Text.MdSemibold'

Text.SmBold = generateTextVariant('SmBold')
Text.SmBold.displayName = 'Text.SmBold'

Text.SmMedium = generateTextVariant('SmMedium')
Text.SmMedium.displayName = 'Text.SmMedium'

Text.SmRegular = generateTextVariant('SmRegular')
Text.SmRegular.displayName = 'Text.SmRegular'

Text.SmSemibold = generateTextVariant('SmSemibold')
Text.SmSemibold.displayName = 'Text.SmSemibold'

Text.XsBold = generateTextVariant('XsBold')
Text.XsBold.displayName = 'Text.XsBold'

Text.XsMedium = generateTextVariant('XsMedium')
Text.XsMedium.displayName = 'Text.XsMedium'

Text.XsRegular = generateTextVariant('XsRegular')
Text.XsRegular.displayName = 'Text.XsRegular'

Text.XsSemibold = generateTextVariant('XsSemibold')
Text.XsSemibold.displayName = 'Text.XsSemibold'

Text.XlBold = generateTextVariant('XlBold')
Text.XlBold.displayName = 'Text.XlBold'

Text.XlMedium = generateTextVariant('XlMedium')
Text.XlMedium.displayName = 'Text.XlMedium'

Text.XlRegular = generateTextVariant('XlRegular')
Text.XlRegular.displayName = 'Text.XlRegular'

Text.XlSemibold = generateTextVariant('XlSemibold')
Text.XlSemibold.displayName = 'Text.XlSemibold'

Text.XxlBold = generateTextVariant('XxlBold')
Text.XxlBold.displayName = 'Text.XxlBold'

Text.XxlMedium = generateTextVariant('XxlMedium')
Text.XxlMedium.displayName = 'Text.XxlMedium'

Text.XxlRegular = generateTextVariant('XxlRegular')
Text.XxlRegular.displayName = 'Text.XxlRegular'

Text.XxlSemibold = generateTextVariant('XxlSemibold')
Text.XxlSemibold.displayName = 'Text.XxlSemibold'

export { Display, Text }

const Display = generateStyledComponent(RawText) as TextComposition<DisplayVariant>
Display.displayName = 'Display'

const generateDisplayVariant = (variant: DisplayVariant = 'MdRegular') =>
  forwardRef<BaseText, TextProps>((props, ref) => {
    return <Display {...{ ...props, ref, variant }} type="display" />
  })

Display.LgMedium = generateDisplayVariant('LgMedium')
Display.LgMedium.displayName = 'Display.LgMedium'

Display.LgRegular = generateDisplayVariant('LgRegular')
Display.LgRegular.displayName = 'Display.LgRegular'

Display.LgSemibold = generateDisplayVariant('LgSemibold')
Display.LgSemibold.displayName = 'Display.LgSemibold'

Display.LgBold = generateDisplayVariant('LgBold')
Display.LgBold.displayName = 'Display.LgBold'

Display.MdBold = generateDisplayVariant('MdBold')
Display.MdBold.displayName = 'Display.MdBold'

Display.MdMedium = generateDisplayVariant('MdMedium')
Display.MdMedium.displayName = 'Display.MdMedium'

Display.MdRegular = generateDisplayVariant('MdRegular')
Display.MdRegular.displayName = 'Display.MdRegular'

Display.MdSemibold = generateDisplayVariant('MdSemibold')
Display.MdSemibold.displayName = 'Display.MdSemibold'

Display.SmBold = generateDisplayVariant('SmBold')
Display.SmBold.displayName = 'Display.SmBold'

Display.SmMedium = generateDisplayVariant('SmMedium')
Display.SmMedium.displayName = 'Display.SmMedium'

Display.SmRegular = generateDisplayVariant('SmRegular')
Display.SmRegular.displayName = 'Display.SmRegular'

Display.SmSemibold = generateDisplayVariant('SmSemibold')
Display.SmSemibold.displayName = 'Display.SmSemibold'

Display.XsBold = generateDisplayVariant('XsBold')
Display.XsBold.displayName = 'Display.XsBold'

Display.XsMedium = generateDisplayVariant('XsMedium')
Display.XsMedium.displayName = 'Display.XsMedium'

Display.XsRegular = generateDisplayVariant('XsRegular')
Display.XsRegular.displayName = 'Display.XsRegular'

Display.XsSemibold = generateDisplayVariant('XsSemibold')
Display.XsSemibold.displayName = 'Display.XsSemibold'

Display.XlBold = generateDisplayVariant('XlBold')
Display.XlBold.displayName = 'Display.XlBold'

Display.XlMedium = generateDisplayVariant('XlMedium')
Display.XlMedium.displayName = 'Display.XlMedium'

Display.XlRegular = generateDisplayVariant('XlRegular')
Display.XlRegular.displayName = 'Display.XlRegular'

Display.XlSemibold = generateDisplayVariant('XlSemibold')
Display.XlSemibold.displayName = 'Display.XlSemibold'

Display.XxlBold = generateDisplayVariant('XxlBold')
Display.XxlBold.displayName = 'Display.XxlBold'

Display.XxlMedium = generateDisplayVariant('XxlMedium')
Display.XxlMedium.displayName = 'Display.XxlMedium'

Display.XxlRegular = generateDisplayVariant('XxlRegular')
Display.XxlRegular.displayName = 'Display.XxlRegular'

Display.XxlSemibold = generateDisplayVariant('XxlSemibold')
Display.XxlSemibold.displayName = 'Display.XxlSemibold'
