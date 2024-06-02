import { ProfileDeleteAccountButton } from '@baca/components/screens/profile/ProfileDeleteAccountButton'
import { ProfileDetailsForm } from '@baca/components/screens/profile/ProfileDetailsForm'
import { ProfileEditImage } from '@baca/components/screens/profile/ProfileEditImage'
import { ProfileHeader } from '@baca/components/screens/profile/ProfileHeader'
import { ProfilePasswordForm } from '@baca/components/screens/profile/ProfilePasswordForm'
import { Box, ScrollView, Spacer } from '@baca/design-system'
import { useTranslation, useScreenOptions } from '@baca/hooks'

export const ProfileScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.profile'),
  })

  return (
    <ScrollView>
      <Box p={4}>
        <ProfileHeader />
        <Spacer y={4} />
        <ProfileEditImage />
        <Spacer y={4} />
        <ProfileDetailsForm />
        <Spacer y={4} />
        <ProfilePasswordForm />
        <Spacer y={4} />
        <ProfileDeleteAccountButton />
      </Box>
    </ScrollView>
  )
}
