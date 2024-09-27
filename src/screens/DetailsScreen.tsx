import { useLocalSearchParams } from 'expo-router'

import { useBottomSheet, Center, Text, Button, Box } from '@/design-system'
import { useScreenOptions, useState, useTranslation } from '@/hooks'

export const DetailsScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const localParams = useLocalSearchParams<{ user: string }>()

  useScreenOptions({
    title: t('navigation.screen_titles.details'),
  })

  const [items, setItems] = useState<string[]>([])
  const { bottomSheetComponentRenderFunction, presentBottomSheet } = useBottomSheet({
    title: 'Details bottom sheet',
  })

  const bottomSheet = bottomSheetComponentRenderFunction(
    <Box px={4} py={10}>
      <Text color="text.brand.primary">{t('details_screen.awesome')}</Text>
      {items.map((item, index) => (
        <Text key={index} color="text.brand.primary">
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
      <Text color="text.brand.primary">
        {t('details_screen.screen_params', { params: JSON.stringify(localParams) })}
      </Text>
      {bottomSheet}
    </Center>
  )
}
