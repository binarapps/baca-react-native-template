import { router, useLocalSearchParams } from 'expo-router'

import { CompanyLogo, ControlledField, FeaturedIcon, FormWrapper } from '@/components'
import { Button, Center, Display, Spacer, Text } from '@/design-system'
import { useEffect, useResetPasswordForm, useTranslation } from '@/hooks'
import { usePasswordValidation } from '@/hooks/usePasswordValidation'

const navigateToLogin = () => {
  router.replace('/sign-in')
}

export const ResetPasswordScreen = () => {
  const { t } = useTranslation()
  const { hash } = useLocalSearchParams<{ hash: string }>()

  const { control, errors, isSubmitting, reset, submit } = useResetPasswordForm()

  const { isPasswordError, passwordSuggestions, validationFn } = usePasswordValidation()

  useEffect(() => {
    if (hash) {
      reset({ hash })
    }
  }, [hash, reset])

  return (
    <FormWrapper>
      <Center>
        <Spacer y={24} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="message-3-line" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold>{t('reset_password_screen.set_new_password')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
          {t('reset_password_screen.welcome_back')}
        </Text.MdRegular>
        <Spacer y={8} />

        <ControlledField.Input
          {...{ control, errors: {} }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="text"
          isInvalid={isPasswordError}
          isRequired
          label={t('form.labels.password')}
          mb={5}
          name="password"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.password')}
          rules={{ validate: { validationFn } }}
          testID="passwordInput"
          type="password"
        />
        {passwordSuggestions}
        <Spacer y={4} />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="text"
          isRequired
          label={t('form.labels.confirm_password')}
          name="confirmPassword"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.confirm_password')}
          rules={{
            required: t('form.validation.required'),
            validate: {
              positive: (inputValue, formValues) => {
                if (formValues.password !== inputValue) {
                  return t('form.validation.passwords_does_not_match')
                }
              },
            },
          }}
          testID="passwordInput"
          type="password"
        />
        <Spacer y={8} />
        <Button loading={isSubmitting} onPress={submit} size="lg" w="full">
          {t('reset_password_screen.reset_password')}
        </Button>
        <Spacer y={8} />
        <Button.LinkGray
          leftIconName="arrow-left-line"
          onPress={navigateToLogin}
          title={t('forgot_password_screen.back_to_login')}
          w="full"
        />
      </Center>
    </FormWrapper>
  )
}
