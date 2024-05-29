import { ControlledField } from '@baca/components'
import { isWeb } from '@baca/constants'
import { Text, Box, Button, Spacer, Row } from '@baca/design-system'
import { useCallback, useTranslation, useUpdateProfileForm, useWeb } from '@baca/hooks'
import { useRouter } from 'expo-router'

export const ProfileDetailsForm = () => {
  const { t } = useTranslation()
  const { shouldApplyMobileStyles } = useWeb()
  const { control, errors, setFocus, submit, isSubmitting } = useUpdateProfileForm()
  const { back } = useRouter()

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])

  return (
    <Box>
      <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.first_name')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="text"
              name="firstName"
              onFocus={focusLastNameInput}
              placeholder={t('form.placeholders.first_name')}
              testID="firstNameInput"
              {...(!isWeb && {
                label: t('form.labels.first_name'),
              })}
            />
          </Box>
        </Box>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.last_name')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="text"
              name="lastName"
              placeholder={t('form.placeholders.last_name')}
              testID="lastNameInput"
              {...(!isWeb && {
                label: t('form.labels.last_name'),
              })}
            />
          </Box>
        </Box>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.email')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="email"
              isDisabled
              name="email"
              onSubmitEditing={submit}
              placeholder={t('form.placeholders.email')}
              testID="emailInput"
              {...(!isWeb && {
                label: t('form.labels.email'),
              })}
            />
          </Box>
        </Box>
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
