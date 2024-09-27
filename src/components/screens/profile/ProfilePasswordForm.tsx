import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { ProfileControlledInput } from './ProfileControlledInput'

import { Box, Button, Row } from '@/design-system'
import { useCallback } from '@/hooks'
import { useUpdatePasswordForm } from '@/hooks/forms'
import { usePasswordValidation } from '@/hooks/usePasswordValidation'

export const ProfilePasswordForm = () => {
  const { t } = useTranslation()
  const { control, errors, submit, isSubmitting, setFocus } = useUpdatePasswordForm()

  const { isPasswordError, passwordSuggestions, validationFn } = usePasswordValidation()

  const focusNewPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
      <ProfileControlledInput
        control={control}
        errors={errors}
        label={t('form.labels.old_password')}
        name="oldPassword"
        onSubmitEditing={focusNewPasswordInput}
        placeholder={t('form.placeholders.old_password')}
        type="password"
      />
      <ProfileControlledInput
        control={control}
        errors={{}}
        isInvalid={isPasswordError}
        isRequired
        label={t('form.labels.new_password')}
        name="password"
        onSubmitEditing={Keyboard.dismiss}
        placeholder={t('form.placeholders.new_password')}
        rules={{ validate: { validationFn } }}
        type="password"
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
