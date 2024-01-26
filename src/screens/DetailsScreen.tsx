import { useBottomSheet, Center, Text, Button, Box } from '~components'
import { useState, useTranslation } from '~hooks'

export const DetailsScreen = (props: DetailsScreenProps): JSX.Element => {
  const {
    route: { params },
  } = props

  const [items, setItems] = useState<string[]>([])
  const { bottomSheetComponentRenderFunction, presentBottomSheet } = useBottomSheet({
    title: 'Details bottom sheet',
  })
  const { t } = useTranslation()

  const bottomSheet = bottomSheetComponentRenderFunction(
    <Box px={4} py={10}>
      <Text color="text">{t('details_screen.awesome')}</Text>
      {items.map((item, index) => (
        <Text key={index} color="text">
          {item}
        </Text>
      ))}
      <Button onPress={() => setItems((prev) => [...prev, 'Item'])}>Text</Button>
    </Box>
  )

  return (
    <Center>
      <Text>{t('details_screen.title')}</Text>
      <Button onPress={presentBottomSheet}>{t('details_screen.open_bottom_sheet')}</Button>
      <Text color="text">
        {t('details_screen.screen_params', { params: JSON.stringify(params) })}
      </Text>
      {bottomSheet}
    </Center>
  )
}
