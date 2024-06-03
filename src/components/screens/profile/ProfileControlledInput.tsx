import { ControlledField } from '@baca/components'
import { isWeb } from '@baca/constants'
import { Box, Text } from '@baca/design-system'
import { useWeb } from '@baca/hooks'
import { ProfileControlledInputProps } from '@baca/types/ProfileInputProps'
import { StyleSheet } from 'react-native'

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
      <Text.SmBold flex={1} color="text.primary" style={s.labelMargin}>
        {label}
      </Text.SmBold>
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
        />
      </Box>
    </Box>
  )
}

const s = StyleSheet.create({
  labelMargin: { marginBottom: 10 },
})
