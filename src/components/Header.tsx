import { Box, Column, Row, Icon, Text, Touchable } from '@baca/design-system'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'

const logoHeight = 24

export const Header = ({ options }: NativeStackHeaderProps) => {
  const router = useRouter()

  return (
    <Column bg="fg.white">
      <Row bg="fg.white" zIndex={3} justifyContent="space-between" alignItems="center">
        <Box ml={4} width={24}>
          {router.canGoBack() && (
            <Touchable onPress={router.back}>
              <Icon name="arrow-left-line" size={24} color="text.brand.primary" />
            </Touchable>
          )}
        </Box>
        {options.title ? (
          <>
            <Box height={logoHeight} />
            <Row ml={8} flex={1}>
              <Text.H4Bold numberOfLines={1} color="text.brand.primary">
                {options.title}
              </Text.H4Bold>
            </Row>
          </>
        ) : (
          <Box />
        )}

        <Box mr={4} width={24} />
      </Row>
    </Column>
  )
}
