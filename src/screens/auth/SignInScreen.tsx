import {
  CompanyLogo,
  ControlledField,
  FormWrapper,
  LanguagePicker,
  Version,
} from '@baca/components'
import { REGEX, isWeb } from '@baca/constants'
import { Box, Button, Center, Display, Row, Spacer, Text } from '@baca/design-system'
import { useCallback, useSignInForm, useTranslation } from '@baca/hooks'
import { useRouter } from 'expo-router'

export const SignInScreen = (): JSX.Element => {
  const { push } = useRouter()
  const { t } = useTranslation()

  const { control, errors, submit, getValues, isSubmitting, setFocus } = useSignInForm()

  const navigateToSignUp = useCallback(() => push('/sign-up'), [push])
  const navigateToAppInfo = useCallback(() => push('/application-info'), [push])
  const navigateToForgotPassword = useCallback(
    () => push(`/forgot-password?email=${encodeURIComponent(getValues('email'))}`),
    [getValues, push]
  )
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <FormWrapper keyboardAwareProps={{ contentContainerStyle: { maxWidth: 'full' } }}>
      {isWeb ? (
        <Box mr={4}>
          <Spacer y={4} />
          <Box alignItems="flex-end" h={8} w="full">
            <LanguagePicker isWeb pickerPlacement="bottomRight" />
          </Box>
        </Box>
      ) : null}
      <Center alignSelf="center" maxWidth={360} width="full">
        {!isWeb ? (
          <Box alignItems="flex-end" h={8} w="full">
            <LanguagePicker pickerPlacement="bottomRight" />
          </Box>
        ) : null}
        <Spacer y={isWeb ? 4 : 8} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <Display.SmSemibold>{t('sign_in_screen.welcome_back')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
          {t('sign_in_screen.welcome_back_enter_details')}
        </Text.MdRegular>
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
          w="full"
        >
          {t('sign_in_screen.sign_in')}
        </Button>
        <Row alignItems="center">
          <Text.SmRegular color="text.tertiary">
            {t('sign_in_screen.do_not_have_an_account')}
          </Text.SmRegular>
          <Button.LinkColor onPress={navigateToSignUp} size="sm">
            {t('sign_in_screen.sign_up')}
          </Button.LinkColor>
        </Row>
      </Center>
      <Box alignItems="center" flexGrow={1} justifyContent="flex-end">
        <Version onPress={navigateToAppInfo} />
      </Box>
    </FormWrapper>
  )
}
