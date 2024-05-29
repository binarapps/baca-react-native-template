import { ControlledField } from '@baca/components'
import { isWeb } from '@baca/constants'
import { Text, Box } from '@baca/design-system'
import { useWeb } from '@baca/hooks'
import { ProfileControlledInputProps } from '@baca/types/ProfileInputProps'

export const ProfileControlledInput = ({
  label,
  name,
  placeholder,
  control,
  errors,
  isDisabled = false,
  onFocus,
  onSubmitEditing,
}: ProfileControlledInputProps) => {
  const { shouldApplyMobileStyles } = useWeb()

  return (
    <Box
      justifyContent="space-between"
      flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
      mb={isWeb ? 10 : 0}
      maxW={800}
    >
      <Text.SmBold flex={1}>{label}</Text.SmBold>
      <Box flex={isWeb ? 2 : 0}>
        <ControlledField.Input
          control={control}
          errors={errors}
          autoCapitalize="none"
          inputMode={name === 'email' ? 'email' : 'text'}
          name={name}
          placeholder={placeholder}
          testID={`${name}Input`}
          isDisabled={isDisabled}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          {...(!isWeb && { label })}
        />
      </Box>
    </Box>
  )
}
