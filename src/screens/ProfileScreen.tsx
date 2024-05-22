import { useAuthControllerDelete } from '@baca/api/query/auth/auth'
import { ControlledField } from '@baca/components'
import { Button, Text, Spacer, Row, Box, useBottomSheet } from '@baca/design-system'
import { useCallback, useTranslation, useUpdateProfileForm, useScreenOptions } from '@baca/hooks'
import { signOut } from '@baca/store/auth'
import { showErrorToast } from '@baca/utils'
import { useRouter } from 'expo-router'

export const ProfileScreen = () => {
  const { t } = useTranslation()
  const { back } = useRouter()
  const { mutateAsync: removeUserAccount, isLoading } = useAuthControllerDelete()
  const { control, errors, isSubmitting, setFocus, submit } = useUpdateProfileForm()

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
      <Text.SmRegular color="text.tertiary" lineHeight="md">
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

  useScreenOptions({
    title: t('navigation.screen_titles.profile'),
  })

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])

  return (
    <Box m={8}>
      <Text.LgBold>{t('profile_screen.profile')}</Text.LgBold>
      <Text.MdRegular>{t('profile_screen.update_your_details')}</Text.MdRegular>
      <Box borderColor="utility.gray.300" borderBottomWidth={2} borderTopWidth={2} my={4} py={4}>
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="text"
          label={t('form.labels.first_name')}
          name="firstName"
          onFocus={focusLastNameInput}
          placeholder={t('form.placeholders.email')}
          testID="emailInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="text"
          label={t('form.labels.last_name')}
          name="lastName"
          placeholder={t('form.placeholders.last_name')}
          testID="lastNameInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          inputMode="email"
          isDisabled
          label={t('form.labels.email')}
          name="email"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.email')}
          testID="emailInput"
        />
      </Box>
      <Row justifyContent="flex-end">
        <Button.SecondaryColor
          disabled={isSubmitting}
          loading={isSubmitting}
          my={8}
          onPress={back}
          testID="backProfileButton"
        >
          {t('common.cancel')}
        </Button.SecondaryColor>
        <Spacer x="4" />
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          my={8}
          onPress={submit}
          testID="saveProfileUpdateButton"
        >
          {t('common.save')}
        </Button>
      </Row>
      <Box borderColor="utility.gray.300" borderTopWidth={2} my={4} py={6}>
        <Button
          leftIconName="delete-bin-line"
          variant="SecondaryDestructive"
          w="1/2"
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
