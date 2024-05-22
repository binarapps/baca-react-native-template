import { useAuthControllerDelete } from '@baca/api/query/auth/auth'
import { ControlledField } from '@baca/components'
import { isWeb } from '@baca/constants'
import { Button, Text, Spacer, Row, Box, useBottomSheet } from '@baca/design-system'
import {
  useCallback,
  useTranslation,
  useUpdateProfileForm,
  useScreenOptions,
  useWeb,
} from '@baca/hooks'
import { signOut } from '@baca/store/auth'
import { showErrorToast } from '@baca/utils'
import { useRouter } from 'expo-router'

export const ProfileScreen = () => {
  const { t } = useTranslation()
  const { back } = useRouter()
  const { shouldApplyMobileStyles } = useWeb()
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

  useScreenOptions({
    title: t('navigation.screen_titles.profile'),
  })

  const focusLastNameInput = useCallback(() => setFocus('lastName'), [setFocus])

  return (
    <Box p={4}>
      <Text.LgBold color="text.primary">{t('profile_screen.profile')}</Text.LgBold>
      <Spacer y={1} />
      <Text.MdRegular color="text.secondary">
        {t('profile_screen.update_your_details')}
      </Text.MdRegular>
      <Spacer y={4} />
      <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.first_name')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="text"
              name="firstName"
              onFocus={focusLastNameInput}
              placeholder={t('form.placeholders.email')}
              testID="emailInput"
              {...(!isWeb && {
                label: t('form.labels.first_name'),
              })}
            />
          </Box>
        </Box>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.last_name')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="text"
              name="lastName"
              placeholder={t('form.placeholders.last_name')}
              testID="lastNameInput"
              {...(!isWeb && {
                label: t('form.labels.last_name'),
              })}
            />
          </Box>
        </Box>
        <Box
          justifyContent="space-between"
          flexDirection={isWeb && !shouldApplyMobileStyles ? 'row' : 'column'}
          mb={isWeb ? 10 : 0}
          maxW={800}
        >
          <Text.SmBold flex={1}>{t('form.labels.last_name')}</Text.SmBold>
          <Box flex={isWeb ? 2 : 0}>
            <ControlledField.Input
              {...{ control, errors }}
              autoCapitalize="none"
              inputMode="email"
              isDisabled
              name="email"
              onSubmitEditing={submit}
              placeholder={t('form.placeholders.email')}
              testID="emailInput"
              {...(!isWeb && {
                label: t('form.labels.email'),
              })}
            />
          </Box>
        </Box>
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
      </Box>

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
