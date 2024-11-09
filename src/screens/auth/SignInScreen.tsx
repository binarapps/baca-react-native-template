import { useRouter } from 'expo-router'

import {
  CompanyLogo,
  ControlledField,
  FormWrapper,
  LanguagePicker,
  SocialButtons,
  Version,
} from '@/components'
import { ThemeSwitcherButton } from '@/components/ThemeSwitcherButton'
import { REGEX, isWeb } from '@/constants'
import { Box, Button, Center, Display, Row, Spacer, Text, AlertBox } from '@/design-system'
import { useCallback, useSignInForm, useState, useTranslation } from '@/hooks'

export const SignInScreen = (): JSX.Element => {
  const { push } = useRouter()
  const { t } = useTranslation()

  const [isSignInButtonDisabled, setIsSignInButtonsDisabled] = useState<boolean>(false)

  const { control, errors, submit, getValues, isSubmitting, setFocus } = useSignInForm({
    setIsSignInButtonsDisabled,
  })

  const navigateToSignUp = useCallback(() => push('/sign-up'), [push])
  const navigateToAppInfo = useCallback(() => push('/application-info'), [push])
  const navigateToForgotPassword = useCallback(
    () => push(`/forgot-password?email=${encodeURIComponent(getValues('email'))}`),
    [getValues, push]
  )
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <FormWrapper keyboardAwareProps={{ contentContainerStyle: { maxWidth: 'auto' } }}>
      <Box flexDirection="row" alignItems="center" w="full" p={4}>
        <Box flex={1} />
        <ThemeSwitcherButton />
        <Spacer x={2} />
        <LanguagePicker isWeb={isWeb} pickerPlacement="bottomRight" />
      </Box>
      <Center alignSelf="center" maxWidth={360} w="full">
        <Spacer y={isWeb ? 4 : 8} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <Display.SmSemibold testID="sign_in:title">
          {t('sign_in_screen.welcome_back')}
        </Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular
          testID="sign_in:sub_title"
          color="text.tertiary"
          textAlign="center"
          lineHeight="lg"
        >
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
          testID="sign_in:email_input"
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
          testID="sign_in:password_input"
          type="password"
        />
        <Row alignItems="center" mb={2} mt={8} w="full" justifyContent="space-between">
          <ControlledField.Checkbox
            {...{ control, errors }}
            label={t('form.checkbox.remember_me')}
            name="confirm"
            testID="sign_in:confirm_checkbox"
          />
          <Button.LinkColor
            testID="sign_in:forgot_password_button"
            onPress={navigateToForgotPassword}
          >
            {t('sign_in_screen.forgot_password')}
          </Button.LinkColor>
        </Row>
        <Button
          disabled={isSubmitting || isSignInButtonDisabled}
          loading={isSubmitting}
          my={4}
          onPress={submit}
          testID="sign_in:submit_button"
          w="full"
        >
          {t('sign_in_screen.sign_in')}
        </Button>
        <SocialButtons
          isDisabled={isSignInButtonDisabled}
          setIsDisabled={setIsSignInButtonsDisabled}
        />
        <Box flex={1} py={4} />
        <Row alignItems="center">
          <Text.SmRegular color="text.tertiary">
            {t('sign_in_screen.do_not_have_an_account')}
          </Text.SmRegular>
          <Button.LinkColor testID="sign_in:sign_up_button" onPress={navigateToSignUp} size="sm">
            {t('sign_in_screen.sign_up')}
          </Button.LinkColor>
        </Row>
        <Box flex={1} py={4} />
        <AlertBox
          status="info"
          title={t('sign_in_screen.alert.title')}
          description={t('sign_in_screen.alert.description')}
        />
      </Center>
      <Box alignItems="center" flexGrow={1} justifyContent="flex-end">
        <Version onPress={navigateToAppInfo} />
      </Box>
    </FormWrapper>
  )
}
