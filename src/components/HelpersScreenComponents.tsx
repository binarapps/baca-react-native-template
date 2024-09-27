import { Box, Spacer, Text } from '@/design-system'

export const HelperSection = ({
  header = '',
  children,
}: {
  header: string
  children: React.ReactNode
}) => {
  return (
    <Box p={4} borderRadius={16} bg="bg.active" mb={4} gap={2}>
      <Text.XlBold>{header}</Text.XlBold>
      <Spacer y={2} />
      {children}
    </Box>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HelperRenderJson = ({ children }: { children: any }) => {
  if (typeof children === 'undefined') {
    return null
  }
  return (
    <Box p={2} bg="bg.quaternary" borderRadius={8}>
      <Text.SmRegular>{JSON.stringify(children, null, 4)}</Text.SmRegular>
    </Box>
  )
}
