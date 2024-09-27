import { router } from 'expo-router'

import { CompanyLogo, FeaturedIcon, FormWrapper } from '@/components'
import { Button, Center, Display, Spacer, Text } from '@/design-system'
import { useTranslation } from '@/hooks'

const navigateToLogin = () => {
  router.replace('/sign-in')
}

export const ResetPasswordCompleteScreen = () => {
  const { t } = useTranslation()

  return (
    <FormWrapper>
      <Center>
        <Spacer y={24} />
        <CompanyLogo height={50} type="binar" />
        <Spacer y={8} />
        <FeaturedIcon iconName="checkbox-circle-line" size="xl" />
        <Spacer y={6} />
        <Display.SmSemibold>{t('reset_password_complete.password_reset')}</Display.SmSemibold>
        <Spacer y={3} />
        <Text.MdRegular color="text.tertiary" textAlign="center" lineHeight="lg">
          {t('reset_password_complete.password_successfully_reset')}
        </Text.MdRegular>
        <Spacer y={8} />
        <Button onPress={navigateToLogin} title={t('common.continue')} w="full" />
      </Center>
    </FormWrapper>
  )
}
