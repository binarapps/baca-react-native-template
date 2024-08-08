import { CompanyLogo, ControlledField, FormWrapper, SocialButtons } from '@baca/components'
import { Box, Button, Center, Display, Row, Spacer, Text } from '@baca/design-system'
import { useCallback, useSignUpForm, useState, useTranslation } from '@baca/hooks'
import { usePasswordValidation } from '@baca/hooks/usePasswordValidation'
import { router } from 'expo-router'
import { Keyboard } from 'react-native'

const navigateToLogIn = () => {
  router.navigate('/sign-in')
}

export const SignUpScreen = () => {
  const { t } = useTranslation()

  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState<boolean>(false)

  const { control, errors, register, isSubmitting, setFocus } = useSignUpForm({
    setIsSignUpButtonDisabled,
  })

  const { isPasswordError, passwordSuggestions, validationFn } = usePasswordValidation()

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])
  const focusEmailInput = useCallback(() => setFocus('email'), [setFocus])
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <FormWrapper>
      <Center>
        <Spacer y={16} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <Display.SmSemibold>{t('sign_up_screen.sign_up')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
          {t('sign_up_screen.start_free_trail')}
        </Text.MdRegular>
        <Spacer y={8} />
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
          {...{ control, errors: {} }}
          autoCapitalize="none"
          enterKeyHint="next"
          isInvalid={isPasswordError}
          isRequired
          label={t('form.labels.password')}
          mb={5}
          name="password"
          onSubmitEditing={Keyboard.dismiss}
          placeholder={t('form.placeholders.create_password')}
          rules={{ validate: { validationFn } }}
          type="password"
        />
        {passwordSuggestions}
        <Box gap={4} my={6} w="full">
          <ControlledField.Checkbox
            {...{ control, errors }}
            label={t('form.checkbox.privacy_policy')}
            isRequired
            name="privacyPolicyAccepted"
            rules={{
              required: t('form.validation.required'),
            }}
          />
          <ControlledField.Checkbox
            {...{ control, errors }}
            label={t('form.checkbox.terms_accepted')}
            isRequired
            name="termsAccepted"
            rules={{
              required: t('form.validation.required'),
            }}
          />
        </Box>

        <Spacer y={4} />
        <Button loading={isSubmitting} onPress={register} w="full">
          {t('sign_up_screen.get_started')}
        </Button>
        <Spacer y={4} />
        <SocialButtons
          isDisabled={isSignUpButtonDisabled}
          setIsDisabled={setIsSignUpButtonDisabled}
        />
        <Spacer y={4} />
        <Row alignItems="center">
          <Text.SmRegular color="text.tertiary">
            {t('sign_up_screen.already_have_an_account')}
          </Text.SmRegular>
          <Button.LinkColor onPress={navigateToLogIn} size="sm">
            {t('sign_up_screen.log_in')}
          </Button.LinkColor>
        </Row>
      </Center>
    </FormWrapper>
  )
}
