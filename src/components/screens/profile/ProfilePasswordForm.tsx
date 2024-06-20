import { Box, Button, Row } from '@baca/design-system'
import { useCallback } from '@baca/hooks'
import { useUpdatePasswordForm } from '@baca/hooks/forms'
import { usePasswordValidation } from '@baca/hooks/usePasswordValidation'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { ProfileControlledInput } from './ProfileControlledInput'

export const ProfilePasswordForm = () => {
  const { t } = useTranslation()
  const { control, errors, submit, isSubmitting, setFocus } = useUpdatePasswordForm()

  const { isPasswordError, passwordSuggestions, validationFn } = usePasswordValidation()

  const focusNewPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
      <ProfileControlledInput
        label={t('form.labels.old_password')}
        name="oldPassword"
        placeholder={t('form.placeholders.old_password')}
        control={control}
        errors={errors}
        onSubmitEditing={focusNewPasswordInput}
      />
      <ProfileControlledInput
        label={t('form.labels.new_password')}
        name="password"
        placeholder={t('form.placeholders.new_password')}
        control={control}
        errors={{}}
        isInvalid={isPasswordError}
        isRequired
        rules={{ validate: { validationFn } }}
        type="password"
        onSubmitEditing={Keyboard.dismiss}
      />
      {passwordSuggestions}
      <Row maxW={800} justifyContent="flex-end">
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={submit}
          testID="changePasswordButton"
        >
          {t('common.change')}
        </Button>
      </Row>
    </Box>
  )
}
