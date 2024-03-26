import { CompanyLogo, ControlledField, FeaturedIcon, FormWrapper } from '@baca/components'
import { REGEX } from '@baca/constants'
import { Button, Center, Display, Spacer, Text } from '@baca/design-system'
import { useForgotPasswordForm, useTranslation, useEffect } from '@baca/hooks'
import { router, useLocalSearchParams } from 'expo-router'

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation()

  const { email } = useLocalSearchParams<{ email?: string }>()

  const { control, errors, isSubmitting, reset, submit } = useForgotPasswordForm({})

  useEffect(() => {
    if (email) {
      reset({ email: decodeURIComponent(email) })
    }
  }, [email, reset])

  return (
    <FormWrapper>
      <Center>
        <Spacer y={24} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="key-2-fill" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold>{t('forgot_password_screen.forgot_password')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
          {t('forgot_password_screen.no_worries')}
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
          onSubmitEditing={submit}
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
        <Spacer y={6} />
        <Button loading={isSubmitting} onPress={submit} size="lg" w="full">
          {t('forgot_password_screen.reset_password')}
        </Button>
        <Spacer y={4} />
        <Button.LinkGray
          leftIconName="arrow-left-line"
          onPress={router.back}
          title={t('forgot_password_screen.back_to_login')}
          w="full"
        />
      </Center>
    </FormWrapper>
  )
}
