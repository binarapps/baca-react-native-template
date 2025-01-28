import { router, useLocalSearchParams } from 'expo-router'

import { CompanyLogo, FeaturedIcon, FormWrapper } from '@/components'
import { Button, Center, Display, Row, Spacer, Text } from '@/design-system'
import { useEffect, useForgotPasswordForm, useTranslation } from '@/hooks'
import { showSuccessToast } from '@/utils'

const navigateToLogin = () => {
  router.navigate('/sign-in')
}

export const ResetPasswordLinkSentScreen = () => {
  const { t } = useTranslation()

  const { email } = useLocalSearchParams<{ email?: string }>()

  const { isSubmitting, reset, submit } = useForgotPasswordForm({
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
    <FormWrapper>
      <Center>
        <Spacer y={24} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="message-3-line" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold textAlign="center" px={4}>
          {t('reset_password_link_sent_screen.check_email')}
        </Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
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
            loading={isSubmitting}
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
    </FormWrapper>
  )
}
