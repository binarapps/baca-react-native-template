import { useAuthControllerDelete } from '@baca/api/query/auth/auth'
import { Button, Text, Spacer, Row, Box, useBottomSheet } from '@baca/design-system'
import { useCallback, useTranslation } from '@baca/hooks'
import { signOut } from '@baca/store/auth'
import { showErrorToast } from '@baca/utils'

export const ProfileDeleteAccountButton = () => {
  const { t } = useTranslation()
  const { mutateAsync: removeUserAccount, isLoading } = useAuthControllerDelete()

  const { bottomSheetComponentRenderFunction, closeBottomSheet, presentBottomSheet } =
    useBottomSheet({
      title: '',
      isDivider: false,
    })

  const handleRemoveUserAccount = useCallback(async () => {
    try {
      await removeUserAccount()
      signOut()
    } catch {
      showErrorToast({
        description: t('errors.something_went_wrong'),
      })
    }
  }, [removeUserAccount, t])

  const bottomSheet = bottomSheetComponentRenderFunction(
    <Box px={4} pb={10}>
      <Text.LgSemibold color="text.primary" pt={4} pb={2}>
        {t('profile_screen.are_you_sure')}
      </Text.LgSemibold>
      <Text.SmRegular color="text.secondary" lineHeight="md">
        {t('profile_screen.remove_account_desc')}
      </Text.SmRegular>
      <Row w="full" justifyContent="space-between" pt={8}>
        <Button variant="SecondaryGray" flex={1} borderRadius={8} onPress={closeBottomSheet}>
          {t('common.cancel')}
        </Button>
        <Spacer x={3} />
        <Button
          onPress={handleRemoveUserAccount}
          variant="PrimaryDestructive"
          flex={1}
          borderRadius={8}
          loading={isLoading}
        >
          {t('profile_screen.remove_account')}
        </Button>
      </Row>
    </Box>,
    {
      name: 'delete-bin-line',
      color: 'featured.icon.light.fg.error',
      bgColor: 'bg.error.secondary',
    }
  )

  return (
    <Box>
      <Box borderColor="border.secondary" borderTopWidth={1} my={4} py={6} alignItems="flex-start">
        <Button
          leftIconName="delete-bin-line"
          variant="SecondaryDestructive"
          borderRadius={8}
          onPress={presentBottomSheet}
        >
          {t('profile_screen.remove_account')}
        </Button>
        {bottomSheet}
      </Box>
    </Box>
  )
}
