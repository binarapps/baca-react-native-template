import { ControlledField } from '@baca/components/organisms/ControlledField'
import { isWeb } from '@baca/constants'
import { Box, Text } from '@baca/design-system'
import { useWeb } from '@baca/hooks'
import { ProfileControlledInputProps } from '@baca/types'

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
