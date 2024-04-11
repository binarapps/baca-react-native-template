import { ControlledField } from '@baca/components'
import { Button, Text, Spacer, Row, Box } from '@baca/design-system'
import { useCallback, useTranslation, useUpdateProfileForm, useScreenOptions } from '@baca/hooks'
import { useRouter } from 'expo-router'

export const ProfileScreen = () => {
  const { t } = useTranslation()
  const { back } = useRouter()

  useScreenOptions({
    title: t('navigation.screen_titles.profile'),
  })

  const { control, errors, isSubmitting, setFocus, submit } = useUpdateProfileForm()

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])

  return (
    <Box m={8}>
      {/* TODO: Add translations here */}
      <Text.LgBold>Profile</Text.LgBold>
      <Text.MdRegular>Update your personal details here.</Text.MdRegular>
      <Box borderColor="utility.gray.300" borderBottomWidth={2} borderTopWidth={2} my={4} py={4}>
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="text"
          label={t('form.labels.first_name')}
          name="firstName"
          onFocus={focusLastNameInput}
          placeholder={t('form.placeholders.email')}
          testID="emailInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="text"
          label={t('form.labels.last_name')}
          name="lastName"
          placeholder={t('form.placeholders.last_name')}
          testID="lastNameInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="email"
          isDisabled
          label={t('form.labels.email')}
          name="email"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.email')}
          testID="emailInput"
        />
      </Box>
      <Row justifyContent="flex-end">
        <Button.SecondaryColor
          disabled={isSubmitting}
          loading={isSubmitting}
          my={8}
          onPress={back}
          testID="backProfileButton"
        >
          {t('common.cancel')}
        </Button.SecondaryColor>
        <Spacer x="4" />
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          my={8}
          onPress={submit}
          testID="saveProfileUpdateButton"
        >
          {t('common.save')}
        </Button>
      </Row>
    </Box>
  )
}
