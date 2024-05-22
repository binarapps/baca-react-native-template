import { BottomSheetHeaderProps } from './types'
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
  iconConfig,
}: BottomSheetHeaderProps) => {
  if (!showCloseButton && !title) {
    return null
  }

  return (
    <Row alignItems="center">
      {iconConfig && (
        <Box backgroundColor={iconConfig.bgColor} p={3} borderRadius={100} ml={4} mt={4}>
          <Icon name={iconConfig.name} size={24} color={iconConfig.color} />
        </Box>
      )}
      <Box flex={1} px={4}>
        {title && (
          <Text.MdBold numberOfLines={numberOfLines} allowFontScaling={false}>
            {title}
          </Text.MdBold>
        )}
      </Box>
      {showCloseButton && (
        <Touchable onPress={onClose} hitSlop={10} p={4} pl={8}>
          <Icon name="close-line" size={24} color="text.brand.primary" />
        </Touchable>
      )}
    </Row>
  )
}
