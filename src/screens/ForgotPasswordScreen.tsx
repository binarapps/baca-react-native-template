import { useScreenOptions, useTranslation } from '@baca/hooks'

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.forgot_password'),
  })

  return <></>
}
