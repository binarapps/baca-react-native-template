import {
  CompanyLogo,
  ControlledField,
  KeyboardAwareScrollView,
  LanguagePicker,
  Version,
} from '@baca/components'
import { REGEX } from '@baca/constants'
import { Box, Button, Center, Row, Spacer, Text } from '@baca/design-system'
import {
  useCallback,
  useSignInForm,
  useTranslation,
  useEffect,
  useScreenOptions,
} from '@baca/hooks'
import { useRouter } from 'expo-router'

export const SignInScreen = (): JSX.Element => {
  const { push } = useRouter()
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.sign_in'),
  })

  const { control, errors, submit, getValues, isSubmitting, setFocus } = useSignInForm()

  useEffect(() => {
    setTimeout(() => {
      setFocus('email')
    }, 500)
  }, [setFocus])

  const navigateToSignUp = useCallback(() => push('/sign-up'), [push])
  const navigateToAppInfo = useCallback(() => push('/application-info'), [push])
  const navigateToForgotPassword = useCallback(
    () => push(`/forgot-password?email=${encodeURIComponent(getValues('email'))}`),
    [getValues, push]
  )
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <KeyboardAwareScrollView>
      <Box alignItems="flex-end" pr={8}>
        <LanguagePicker />
      </Box>
      <Center p={8}>
        <Spacer y={16} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="email"
          isRequired
          label={t('form.labels.email')}
          name="email"
          onSubmitEditing={focusPasswordInput}
          placeholder={t('form.placeholders.email')}
          rules={{
            required: t('form.validation.required'),
            pattern: {
              value: REGEX.EMAIL,
              message: t('form.validation.invalid_email_format'),
            },
          }}
          testID="emailInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="send"
          isRequired
          label={t('form.labels.password')}
          name="password"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.password')}
          rules={{
            required: t('form.validation.required'),
          }}
          testID="passwordInput"
          type="password"
        />
        <Row alignItems="center" mt={8} w="full" justifyContent="space-between">
          <ControlledField.Checkbox
            {...{ control, errors }}
            checkboxText={t('form.checkbox.remember_me')}
            name="confirm"
            testID="confirmCheckbox"
          />
          <Button.LinkColor onPress={navigateToForgotPassword}>
            {t('sign_in_screen.forgot_password')}
          </Button.LinkColor>
        </Row>
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          my={8}
          onPress={submit}
          testID="signInButton"
        >
          {t('sign_in_screen.sign_in')}
        </Button>
        <Text bold mb={4}>
          {t('sign_in_screen.do_not_have_an_account')}
        </Text>
        <Button.LinkColor onPress={navigateToSignUp}>
          {t('sign_in_screen.sign_up')}
        </Button.LinkColor>

        <Box mt={12} />
        {/* TODO: Remove this after implementing signing in with backend  */}
        <Text bold>Correct credentials</Text>
        <Text color="text.primary" textAlign="center">
          Email: test@example.com{'\n'}Password: 123456
        </Text>
        <Version onPress={navigateToAppInfo} />
      </Center>
    </KeyboardAwareScrollView>
  )
}
