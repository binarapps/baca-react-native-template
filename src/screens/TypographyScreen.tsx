import {
  Box,
  Text,
  Display,
  DisplayVariant,
  TextVariant,
  RenderComponentWithExample,
  ScrollView,
} from '@/design-system'
import { useTranslation } from '@/hooks'

const generateTextVariantsToRender = <T extends string[]>(variants: T, component: React.FC) => {
  const originalVariants = Object.keys(component).filter(
    (key) => key !== '$$typeof' && key !== 'render'
  )

  // Step 1: Extract elements from array1 that are also in array2
  const commonElements = variants.filter((element) => originalVariants.includes(element))

  // Step 2: Extract elements from array2 that are not in array1
  const remainingElements = originalVariants.filter((element) => !variants.includes(element))

  // Step 3: Combine both parts to form the third array
  const combinedArray = [...commonElements, ...remainingElements]

  return combinedArray as T
}

export const textVariantsStrings: TextVariant[] = [
  'XxlBold',
  'XxlMedium',
  'XxlRegular',
  'XxlSemibold',
  'XlBold',
  'XlSemibold',
  'XlMedium',
  'XlRegular',
  'LgBold',
  'LgSemibold',
  'LgMedium',
  'LgRegular',
  'MdBold',
  'MdSemibold',
  'MdMedium',
  'MdRegular',
  'SmBold',
  'SmSemibold',
  'SmMedium',
  'SmRegular',
  'XsBold',
  'XsSemibold',
  'XsMedium',
  'XsRegular',
] as const

const displayTextVariantsStrings: DisplayVariant[] = [
  'XxlBold',
  'XxlSemibold',
  'XxlMedium',
  'XxlRegular',
  'XlBold',
  'XlSemibold',
  'XlMedium',
  'XlRegular',
  'LgBold',
  'LgSemibold',
  'LgMedium',
  'LgRegular',
  'MdBold',
  'MdSemibold',
  'MdMedium',
  'MdRegular',
  'SmBold',
  'SmSemibold',
  'SmMedium',
  'SmRegular',
  'XsBold',
  'XsSemibold',
  'XsMedium',
  'XsRegular',
] as const

const textVariants = generateTextVariantsToRender(textVariantsStrings, Text)
const displayTextVariants = generateTextVariantsToRender(displayTextVariantsStrings, Display)

export const TypographyScreen = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <ScrollView flexGrow={1} p={4}>
      <Box gap={6}>
        <Display.XxlBold color="text.error.primary" py={4}>
          {t('typography_screen.display_font_size')}
        </Display.XxlBold>
        {displayTextVariants.map((variant) => (
          <RenderComponentWithExample
            key={variant}
            Component={`Display.${variant}`}
            propsToOmmit={['variant', 'type']}
            ComponentWithProps={
              <Display type="display" variant={variant}>
                {'Display - ' + variant}
              </Display>
            }
          />
        ))}
        <Display.XxlBold color="text.error.primary" py={4}>
          {t('typography_screen.text_font_size')}
        </Display.XxlBold>

        {textVariants.map((variant) => (
          <RenderComponentWithExample
            key={variant}
            Component={`Text.${variant}`}
            propsToOmmit={['variant', 'type']}
            ComponentWithProps={<Text variant={variant}>{'Text - ' + variant}</Text>}
          />
        ))}
      </Box>
    </ScrollView>
  )
}
