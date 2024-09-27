import { Box, Touchable, Text } from '@/design-system/components'

type MenuItemProps = {
  onPress: () => void
} & React.PropsWithChildren
const MenuItem: React.FC<MenuItemProps> = ({ children, onPress, ...props }) => {
  return (
    <Box px={2}>
      <Touchable onPress={onPress} {...props}>
        <Text py={2}>{children}</Text>
      </Touchable>
    </Box>
  )
}

MenuItem.displayName = 'MenuItem'

export { MenuItem }
