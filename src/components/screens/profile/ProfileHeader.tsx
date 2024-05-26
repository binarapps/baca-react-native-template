import { Box, Text } from '@baca/design-system'
import { useTranslation } from '@baca/hooks'

export const ProfileHeader = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Text.LgBold color="text.primary">{t('profile_screen.profile')}</Text.LgBold>
      <Text.MdRegular color="text.secondary">
        {t('profile_screen.update_your_details')}
      </Text.MdRegular>
    </Box>
  )
}
