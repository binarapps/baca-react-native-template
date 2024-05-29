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
          labelTx="form.labels.first_name"
          name="firstName"
          placeholderTx="form.placeholders.first_name"
          control={control}
          errors={errors}
          onFocus={focusLastNameInput}
        />
        <ProfileControlledInput
          labelTx="form.labels.last_name"
          name="lastName"
          placeholderTx="form.placeholders.last_name"
          control={control}
          errors={errors}
        />
        <ProfileControlledInput
          labelTx="form.labels.email"
          name="email"
          placeholderTx="form.placeholders.email"
          control={control}
          errors={errors}
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
