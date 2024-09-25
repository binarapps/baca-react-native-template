import {
  ScrollView,
  Box,
  RenderComponentWithExample,
  Row,
  Display,
  CheckboxButton,
  Spacer,
} from '@baca/design-system'
import { useBoolean, useScreenOptions, useTheme, useTranslation } from '@baca/hooks'

const RecursiveColorList = ({
  data,
  parentKey = '',
  recursiveLevel = 0,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  parentKey?: string
  recursiveLevel?: number
}) => {
  const sortedArray = Object.entries(data).sort(([keyA, valueA], [keyB, valueB]) => {
    const aIsString = typeof valueA === 'string'
    const bIsString = typeof valueB === 'string'

    if (aIsString && !bIsString) return -1 // `a` comes before `b`
    if (!aIsString && bIsString) return 1 // `b` comes before `a`
    return 0 // No change in order
  })

  return sortedArray.map(([key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key

    if (typeof value === 'string') {
      // It's a color
      return (
        <RenderComponentWithExample
          key={currentKey}
          Component={Box}
          ComponentWithProps={
            <Box
              borderWidth={1}
              borderRadius={8}
              borderColor="text.primary"
              width={20}
              height={20}
              bg={currentKey as ColorNames}
            />
          }
        />
      )
    } else if (typeof value === 'object') {
      // It's a nested category
      return (
        <Box key={currentKey} gap={2} width="100%" mt={`${16 - 2 * recursiveLevel}px`}>
          <Display.LgBold
            fontSize={36 - recursiveLevel * 2.5}
            color="text.primary"
            capitalize={recursiveLevel === 0}
          >
            {currentKey}
          </Display.LgBold>

          <Row flexWrap="wrap" gap={4}>
            <RecursiveColorList
              data={value}
              parentKey={currentKey}
              recursiveLevel={recursiveLevel + 1}
            />
          </Row>
        </Box>
      )
    } else {
      return null
    }
  })
}

export const ColorsScreen = (): JSX.Element => {
  const { t } = useTranslation()

  const [shouldDisplayAll, setShouldDisplayAll] = useBoolean(false)

  useScreenOptions({
    title: t('navigation.screen_titles.colors'),
  })

  const theme = useTheme()

  const colorsToRender = shouldDisplayAll
    ? theme.colors
    : {
        text: theme.colors.text,
        bg: theme.colors.bg,
        Base: theme.colors.Base,
        Error: theme.colors.Error,
        Warning: theme.colors.Warning,
        Success: theme.colors.Success,
      }

  return (
    <ScrollView flexGrow={1} p={4}>
      <CheckboxButton
        onChange={setShouldDisplayAll.toggle}
        isSelected={shouldDisplayAll}
        label="Display all colors"
      />
      <Spacer y={4} />
      <RecursiveColorList data={colorsToRender} />
    </ScrollView>
  )
}
