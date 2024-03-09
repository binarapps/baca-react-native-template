import { ControlledField, KeyboardAwareScrollView } from '@baca/components'
import { REGEX } from '@baca/constants'
import { Button, Center, Spacer } from '@baca/design-system'
import { useScreenOptions, useSignUpForm, useTranslation } from '@baca/hooks'
import { useCallback, useEffect } from 'react'

export const SignUpScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.sign_up'),
  })

  const { control, errors, register, isRegisterLoading, setFocus } = useSignUpForm()

  useEffect(() => {
    setTimeout(() => {
      setFocus('firstName')
    }, 500)
  }, [setFocus])

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])
  const focusEmailInput = useCallback(() => setFocus('email'), [setFocus])
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <KeyboardAwareScrollView>
      <Center flex={1} flexGrow={1} px={8}>
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          isRequired
          label={t('sign_up_screen.first_name_label')}
          mb={2}
          name="firstName"
          onSubmitEditing={focusLastNameInput}
          placeholder={t('sign_up_screen.first_name_placeholder')}
          rules={{
            required: t('form.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          isRequired
          label={t('sign_up_screen.last_name_label')}
          mb={2}
          name="lastName"
          onSubmitEditing={focusEmailInput}
          placeholder={t('sign_up_screen.last_name_placeholder')}
          rules={{
            required: t('form.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="email"
          isRequired
          label={t('sign_up_screen.email_label')}
          mb={2}
          name="email"
          onSubmitEditing={focusPasswordInput}
          placeholder={t('sign_up_screen.email_placeholder')}
          rules={{
            required: t('form.required'),
            pattern: {
              value: REGEX.EMAIL,
              message: t('form.invalid_email_format'),
            },
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          isRequired
          label={t('sign_up_screen.password_label')}
          mb={16}
          name="password"
          onSubmitEditing={register}
          placeholder={t('sign_up_screen.password_placeholder')}
          rules={{
            required: t('form.required'),
            pattern: {
              value: REGEX.REGISTRATION_PASSWORD,
              message: t('form.invalid_password_format'),
            },
          }}
          type="password"
        />
        <Spacer y={2} />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('sign_up_screen.privacy_policy_label')}
          isRequired
          name="privacyPolicyAccepted"
          rules={{
            required: t('form.required'),
          }}
          size={18}
        />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('sign_up_screen.terms_accepted_label')}
          isRequired
          name="termsAccepted"
          rules={{
            required: t('form.required'),
          }}
          size={18}
        />
        <Spacer y={2} />
        <Spacer y={2} />
        <Button disabled={isRegisterLoading} loading={isRegisterLoading} onPress={register}>
          {t('sign_up_screen.sign_up')}
        </Button>
      </Center>
    </KeyboardAwareScrollView>
  )
}
