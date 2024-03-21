import {
  CompanyLogo,
  ControlledField,
  FeaturedIcon,
  KeyboardAwareScrollView,
} from '@baca/components'
import { REGEX } from '@baca/constants'
import { Button, Center, Display, Spacer, Text } from '@baca/design-system'
import { useForgotPasswordForm, useScreenOptions, useTranslation, useEffect } from '@baca/hooks'
import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.forgot_password'),
  })

  const { email } = useLocalSearchParams<{ email?: string }>()

  const { control, errors, reset, submit } = useForgotPasswordForm({})

  useEffect(() => {
    if (email) {
      reset({ email: decodeURIComponent(email) })
    }
  }, [email, reset])

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Center>
        <Spacer y={16} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="key-2-fill" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold>{t('forgot_password_screen.forgot_password')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular textAlign="center" lineHeight="lg">
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
        <Button onPress={submit} size="lg" w="full">
          {t('forgot_password_screen.reset_password')}
        </Button>
        <Spacer y={8} />
        <Button.LinkGray
          leftIconName="arrow-left-line"
          onPress={router.back}
          title={t('forgot_password_screen.back_to_login')}
        />
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: { padding: 32 },
})
