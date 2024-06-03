import { Box, Button, Row } from '@baca/design-system'
import { useUpdatePasswordForm } from '@baca/hooks/forms/useUpdatePasswordForm'
import { useTranslation } from 'react-i18next'

import { ProfileControlledInput } from './ProfileControlledInput'

export const ProfilePasswordForm = () => {
  const { t } = useTranslation()
  const { control, errors, submit, isSubmitting } = useUpdatePasswordForm()

  return (
    <Box>
      <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
        <ProfileControlledInput
          label={t('form.labels.old_password')}
          name="oldPassword"
          placeholder={t('form.placeholders.old_password')}
          control={control}
          errors={errors}
        />
        <ProfileControlledInput
          label={t('form.labels.new_password')}
          name="password"
          placeholder={t('form.placeholders.new_password')}
          control={control}
          errors={errors}
        />
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
    </Box>
  )
}
