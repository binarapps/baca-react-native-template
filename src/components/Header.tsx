import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'

import { Box, Column, Row, Icon, Text, Touchable } from '@/design-system'

export const Header = ({ options }: NativeStackHeaderProps) => {
  const router = useRouter()
  const showGoBackButton = router.canGoBack()

  return (
    <Column py={6}>
      <Row zIndex={3} justifyContent="space-between" alignItems="center">
        <Box ml={4} width={24}>
          {showGoBackButton && (
            <Touchable onPress={router.back}>
              <Icon name="arrow-left-line" size={24} />
            </Touchable>
          )}
        </Box>
        {options.title ? (
          <>
            <Text.LgBold numberOfLines={1}>{options.title}</Text.LgBold>
          </>
        ) : (
          <Box />
        )}

        <Box mr={4} width={24} />
      </Row>
    </Column>
  )
}
