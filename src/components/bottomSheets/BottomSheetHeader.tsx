import { Box } from '@baca/components/atoms/Box'
import { Icon } from '@baca/components/atoms/Icon'
import { Row } from '@baca/components/atoms/Row'
import { Text } from '@baca/components/atoms/Text'
import { Touchable } from '@baca/components/atoms/Touchables/Touchable'

export const BottomSheetHeader = ({
  title,
  numberOfLines = undefined,
  showCloseButton,
  onClose,
}: {
  title?: string
  numberOfLines?: number
  showCloseButton?: boolean
  onClose?: () => void
}) => {
  if (!showCloseButton && !title) {
    return null
  }

  return (
    <Row alignItems="center">
      <Box flex={1} px={4}>
        <Text.H4Bold numberOfLines={numberOfLines} allowFontScaling={false}>
          {title}
        </Text.H4Bold>
      </Box>
      {showCloseButton && (
        <Touchable onPress={onClose} hitSlop={10} p={4} pl={8}>
          <Icon name="close-line" size={24} color="text.brand.primary" />
        </Touchable>
      )}
    </Row>
  )
}
