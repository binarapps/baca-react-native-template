import { ControlledField } from '@/components/organisms/ControlledField'
import { isWeb } from '@/constants'
import { Box, Text } from '@/design-system'
import { useWeb } from '@/hooks'
import { ProfileControlledInputProps } from '@/types'

export const ProfileControlledInput = ({
  label,
  name,
  isDisabled = false,
  ...rest
}: ProfileControlledInputProps) => {
  const { shouldApplyMobileStyles } = useWeb()

  return (
    <Box
      justifyContent="space-between"
      flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
      mb={isWeb ? 10 : 0}
      maxW={800}
    >
      <Text.SmBold flex={1} color="text.primary" mb={2.5}>
        {label}
      </Text.SmBold>
      <Box flex={isWeb ? 2 : 0}>
        <ControlledField.Input
          autoCapitalize="none"
          inputMode={name === 'email' ? 'email' : 'text'}
          name={name}
          testID={`${name}Input`}
          isDisabled={isDisabled}
          {...rest}
        />
      </Box>
    </Box>
  )
}
