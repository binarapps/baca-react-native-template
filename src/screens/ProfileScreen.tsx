import { ProfileDeleteAccountButton } from '@baca/components/screens/profile/ProfileDeleteAccountButton'
import { ProfileDetailsForm } from '@baca/components/screens/profile/ProfileDetailsForm'
import { ProfileHeader } from '@baca/components/screens/profile/ProfileHeader'
import { Button, Spacer, Row, Box } from '@baca/design-system'
import { useTranslation, useUpdateProfileForm, useScreenOptions } from '@baca/hooks'
import { useRouter } from 'expo-router'

export const ProfileScreen = () => {
  const { t } = useTranslation()
  const { back } = useRouter()
  const { isSubmitting, submit } = useUpdateProfileForm()

  useScreenOptions({
    title: t('navigation.screen_titles.profile'),
  })

  return (
    <Box p={4}>
      <ProfileHeader />
      <Spacer y={4} />
      <ProfileDetailsForm />
      <Row maxW={800} justifyContent="flex-end">
        <Button.SecondaryColor
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={back}
          testID="backProfileButton"
        >
          {t('common.cancel')}
        </Button.SecondaryColor>
        <Spacer x="4" />
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={submit}
          testID="saveProfileUpdateButton"
        >
          {t('common.save')}
        </Button>
      </Row>
      <ProfileDeleteAccountButton />
    </Box>
  )
}
