import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

import { useAuthControllerConfirmEmail } from '@/api/query/auth/auth'
import { Button, Center, Loader, Spacer, Text } from '@/design-system'
import { useTranslation } from '@/hooks'
import { isSignedInAtom, signOut } from '@/store/auth'

const navigateToSignIn = () => router.replace('/sign-in')

export const ConfirmEmail = () => {
  const { t } = useTranslation()
  const { hash } = useLocalSearchParams<{ hash: string }>()

  const {
    isError,
    isPending,
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
    confirmFn(hash)
  }, [hash, confirmEmailMutation])

  return (
    <Center flexGrow={1}>
      {isPending && (
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
