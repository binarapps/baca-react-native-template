import { Box, Button, Spacer, Row } from '@baca/design-system'
import { useUpdateProfileForm } from '@baca/hooks'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileControlledInput } from './ProfileControlledInput'

export const ProfileDetailsForm = () => {
  const { t } = useTranslation()
  const { control, errors, setFocus, submit, isSubmitting } = useUpdateProfileForm()
  const { back } = useRouter()

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])

  return (
    <Box>
      <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
        <ProfileControlledInput
          label={t('form.labels.first_name')}
          name="firstName"
          placeholder={t('form.placeholders.first_name')}
          {...{ control, errors }}
          onFocus={focusLastNameInput}
        />
        <ProfileControlledInput
          label={t('form.labels.last_name')}
          name="lastName"
          placeholder={t('form.placeholders.last_name')}
          {...{ control, errors }}
        />
        <ProfileControlledInput
          label={t('form.labels.email')}
          name="email"
          placeholder={t('form.placeholders.email')}
          {...{ control, errors }}
          isDisabled
          onSubmitEditing={submit}
        />
        <Row maxW={800} justifyContent="flex-end">
          <Button.SecondaryColor
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={back}
            testID="backProfileButton"
          >
            {t('common.cancel')}
          </Button.SecondaryColor>
          <Spacer x="4" />
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={submit}
            testID="saveProfileUpdateButton"
          >
            {t('common.save')}
          </Button>
        </Row>
      </Box>
    </Box>
  )
}
