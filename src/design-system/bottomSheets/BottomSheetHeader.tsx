import { Box } from '../components/Box'
import { Icon } from '../components/Icon'
import { Row } from '../components/Row'
import { Text } from '../components/Text'
import { Touchable } from '../components/Touchables/Touchable'

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
        <Text.MdBold numberOfLines={numberOfLines} allowFontScaling={false}>
          {title}
        </Text.MdBold>
      </Box>
      {showCloseButton && (
        <Touchable onPress={onClose} hitSlop={10} p={4} pl={8}>
          <Icon name="close-line" size={24} color="text.brand.primary" />
        </Touchable>
      )}
    </Row>
  )
}
