import { ControlledField } from '@baca/components'
import { isWeb } from '@baca/constants'
import { Text, Box } from '@baca/design-system'
import { useTranslation, useWeb } from '@baca/hooks'
import { I18nKeys } from '@baca/types/i18next'
import { Control, FieldErrors } from 'react-hook-form'

interface ProfileControlledInputProps {
  labelTx: I18nKeys
  name: string
  placeholderTx: I18nKeys
  control: Control
  errors: FieldErrors
  isDisabled?: boolean
  onFocus?: () => void
  onSubmitEditing?: () => void
}

export const ProfileControlledInput = ({
  labelTx,
  name,
  placeholderTx,
  control,
  errors,
  isDisabled = false,
  onFocus,
  onSubmitEditing,
}: ProfileControlledInputProps) => {
  const { t } = useTranslation()
  const { shouldApplyMobileStyles } = useWeb()

  return (
    <Box
      justifyContent="space-between"
      flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
      mb={isWeb ? 10 : 0}
      maxW={800}
    >
      <Text.SmBold flex={1}>{t(labelTx)}</Text.SmBold>
      <Box flex={isWeb ? 2 : 0}>
        <ControlledField.Input
          control={control}
          errors={errors}
          autoCapitalize="none"
          inputMode={name === 'email' ? 'email' : 'text'}
          name={name}
          placeholder={t(placeholderTx)}
          testID={`${name}Input`}
          isDisabled={isDisabled}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          {...(!isWeb && { label: t(labelTx) })}
        />
      </Box>
    </Box>
  )
}
