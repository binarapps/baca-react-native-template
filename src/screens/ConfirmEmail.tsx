import { useAuthControllerConfirmEmail } from '@baca/api/query/auth/auth'
import { Button, Center, Loader, Spacer, Text } from '@baca/design-system'
import { useTranslation } from '@baca/hooks'
import { isSignedInAtom, signOut } from '@baca/store/auth'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

const navigateToSignIn = () => router.replace('/sign-in')

export const ConfirmEmail = () => {
  const { t } = useTranslation()
  const { code } = useLocalSearchParams<{ code: string }>()

  const {
    isError,
    isLoading,
    isSuccess,
    mutate: confirmEmailMutation,
  } = useAuthControllerConfirmEmail()

  useEffect(() => {
    const confirmFn = async (hash?: string) => {
      if (hash) {
        try {
          if (isSignedInAtom) {
            await signOut()
          }
        } finally {
          confirmEmailMutation({ data: { hash } })
        }
      }
    }
    confirmFn(code)
  }, [code, confirmEmailMutation])

  return (
    <Center flexGrow={1}>
      {isLoading && (
        <Center gap={6}>
          <Loader type="bubbles" />
          <Text>{t('confirm_email_screen.verification_in_progress')}</Text>
        </Center>
      )}
      {isError && (
        <Center>
          <Text>{t('confirm_email_screen.verification_failed')}</Text>
          <Spacer y={4} />
          <Button onPress={navigateToSignIn}>{t('confirm_email_screen.go_back_login')}</Button>
        </Center>
      )}
      {isSuccess && (
        <Center>
          <Text>{t('confirm_email_screen.verification_succeed')}</Text>
          <Spacer y={4} />
          <Button onPress={navigateToSignIn}>{t('confirm_email_screen.go_back_login')}</Button>
        </Center>
      )}
    </Center>
  )
}
