import { ControlledField, KeyboardAwareScrollView } from '@baca/components'
import { Button, Center, Spacer } from '@baca/design-system'
import { useScreenOptions, useSignUpForm, useTranslation } from '@baca/hooks'
import { useCallback, useEffect } from 'react'

export const SignUpScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.sign_up'),
  })

  const { control, errors, register, isSubmitting, setFocus } = useSignUpForm()

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
          label={t('form.labels.first_name')}
          mb={2}
          name="firstName"
          onSubmitEditing={focusLastNameInput}
          placeholder={t('form.placeholders.first_name')}
          rules={{
            required: t('form.validation.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          isRequired
          label={t('form.labels.last_name')}
          mb={2}
          name="lastName"
          onSubmitEditing={focusEmailInput}
          placeholder={t('form.placeholders.last_name')}
          rules={{
            required: t('form.validation.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="email"
          isRequired
          label={t('form.labels.email')}
          mb={2}
          name="email"
          onSubmitEditing={focusPasswordInput}
          placeholder={t('form.placeholders.email')}
          rules={{
            required: t('form.validation.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          isRequired
          label={t('form.labels.password')}
          mb={16}
          name="password"
          onSubmitEditing={register}
          placeholder={t('form.placeholders.create_password')}
          rules={{
            required: t('form.validation.required'),
          }}
          type="password"
        />
        <Spacer y={2} />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('form.checkbox.privacy_policy')}
          isRequired
          name="privacyPolicyAccepted"
          rules={{
            required: t('form.validation.required'),
          }}
          size={18}
        />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('form.checkbox.terms_accepted')}
          isRequired
          name="termsAccepted"
          rules={{
            required: t('form.validation.required'),
          }}
          size={18}
        />
        <Spacer y={2} />
        <Spacer y={2} />
        <Button disabled={isSubmitting} loading={isSubmitting} onPress={register}>
          {t('sign_up_screen.sign_up')}
        </Button>
      </Center>
    </KeyboardAwareScrollView>
  )
}
