import { useCallback, useEffect } from 'react'

import { Button, Center, Spacer, ControlledField, KeyboardAwareScrollView } from '~components'
import { REGEX } from '~constants'
import { useScreenOptions, useSignUpForm, useTranslation } from '~hooks'

export const SignUpScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.sign_up'),
  })

  const { control, errors, submit, isSubmitting, setFocus } = useSignUpForm()

  useEffect(() => {
    setTimeout(() => {
      setFocus('user')
    }, 500)
  }, [setFocus])

  const focusEmailInput = useCallback(() => setFocus('email'), [setFocus])
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <KeyboardAwareScrollView>
      <Center px={8} flex={1} flexGrow={1}>
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          label={t('common.user_label')}
          mb={2}
          name="user"
          onSubmitEditing={focusEmailInput}
          placeholder={t('common.user_placeholder')}
          rules={{
            required: t('form.required'),
          }}
        />
        <ControlledField.Input
          {...{ control, errors }}
          enterKeyHint="next"
          autoCapitalize="none"
          isRequired
          keyboardType="email-address"
          label={t('common.email_label')}
          mb={2}
          name="email"
          onSubmitEditing={focusPasswordInput}
          placeholder={t('common.email_placeholder')}
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
          enterKeyHint="next"
          autoCapitalize="none"
          isRequired
          label={t('sign_in_screen.password_label')}
          mb={16}
          name="password"
          onSubmitEditing={submit}
          placeholder={t('sign_in_screen.password_placeholder')}
          rules={{
            required: t('form.required'),
          }}
          type="password"
        />
        <Spacer y={2} />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('sign_up_screen.agree_terms_label')}
          isRequired
          name="agree"
          size={18}
        />
        <Spacer y={2} />
        <ControlledField.Checkbox
          {...{ control, errors }}
          checkboxText={t('sign_up_screen.newsletter_label')}
          isRequired
          name="newsletter"
          size={18}
        />
        <Spacer y={2} />
        <Button disabled={isSubmitting} loading={isSubmitting} onPress={submit}>
          {t('sign_up_screen.sign_up')}
        </Button>
      </Center>
    </KeyboardAwareScrollView>
  )
}
