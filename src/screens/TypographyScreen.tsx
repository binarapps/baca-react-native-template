import { useColorScheme } from '@baca/contexts'
import { Column, Row, Box, Text, Display, DisplayVariant, TextVariant } from '@baca/design-system'
import { useTranslation } from '@baca/hooks'
import { ScrollView, Switch, Platform } from 'react-native'

export const textVariants: TextVariant[] = [
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

const displayTextVariants: DisplayVariant[] = [
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
const isWeb = Platform.OS === 'web'

export const TypographyScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const { setColorSchemeSetting, colorScheme } = useColorScheme()

  return (
    <ScrollView>
      <Row>
        <Column flex={1} alignItems="center" justifyContent="center">
          <Row alignItems="center" flex={1}>
            <Text>🌞</Text>
            {/* 
            Investigate the issue about using `useCallback` on `onChange`
            https://github.com/adobe/react-spectrum/issues/2320
          */}
            <Box mx={4} my={8}>
              <Switch
                value={colorScheme === 'dark'}
                {...(isWeb
                  ? {
                      onValueChange: () =>
                        setColorSchemeSetting(colorScheme === 'dark' ? 'light' : 'dark'),
                    }
                  : {
                      onChange: () =>
                        setColorSchemeSetting(colorScheme === 'dark' ? 'light' : 'dark'),
                    })}
              />
            </Box>
            <Text>🌚</Text>
          </Row>
          <Text color="text.error.primary" variant="XlBold">
            {t('typography_screen.display_font_size')}
          </Text>
          {displayTextVariants.map((variant) => (
            <Display type="display" key={variant} p={8} variant={variant}>
              Display - {variant}
            </Display>
          ))}
          <Text color="text.error.primary" my={4} variant="XlBold">
            {t('typography_screen.text_font_size')}
          </Text>
          {textVariants.map((variant) => (
            <Text key={variant} p={8} variant={variant}>
              Text - {variant}
            </Text>
          ))}
        </Column>
      </Row>
    </ScrollView>
  )
}
