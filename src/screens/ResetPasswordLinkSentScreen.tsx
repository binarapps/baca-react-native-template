import { CompanyLogo, FeaturedIcon, KeyboardAwareScrollView } from '@baca/components'
import { Button, Center, Display, Row, Spacer, Text } from '@baca/design-system'
import { useEffect, useForgotPasswordForm, useScreenOptions, useTranslation } from '@baca/hooks'
import { showSuccessToast } from '@baca/utils'
import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

const navigateToLogin = () => {
  router.navigate('/sign-in')
}

export const ResetPasswordLinkSentScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.forgot_password'),
  })

  const { email } = useLocalSearchParams<{ email?: string }>()

  const { reset, submit } = useForgotPasswordForm({
    onSuccess: () => {
      showSuccessToast({ description: 'Password link resend' })
    },
  })

  useEffect(() => {
    if (email) {
      reset({ email })
    }
  }, [email, reset])

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Center>
        <Spacer y={16} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="message-3-line" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold>{t('reset_password_link_sent_screen.check_email')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular textAlign="center" lineHeight="lg">
          {t('reset_password_link_sent_screen.we_sent_link')}
        </Text.MdRegular>
        <Text.MdMedium>{email}</Text.MdMedium>
        <Spacer y={8} />

        <Button size="lg" w="full">
          {t('reset_password_link_sent_screen.open_email_app')}
        </Button>
        <Spacer y={8} />
        <Row alignItems="center">
          <Text.SmRegular>{t('reset_password_link_sent_screen.did_not_receive')}</Text.SmRegular>
          <Button.LinkColor
            onPress={submit}
            size="md"
            title={t('reset_password_link_sent_screen.click_to_resend')}
          />
        </Row>
        <Spacer y={8} />
        <Button.LinkGray
          leftIconName="arrow-left-line"
          onPress={navigateToLogin}
          title={t('forgot_password_screen.back_to_login')}
        />
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: { padding: 32 },
})
