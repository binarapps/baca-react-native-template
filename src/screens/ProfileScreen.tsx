import {
  ProfileDeleteAccountButton,
  ProfileDetailsForm,
  ProfileEditImage,
  ProfileHeader,
  ProfilePasswordForm,
} from '@/components'
import { Box, ScrollView, Spacer } from '@/design-system'
import { useTranslation, useScreenOptions } from '@/hooks'

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
