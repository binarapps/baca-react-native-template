import { useAuthControllerConfirmEmail } from '@baca/api/query/auth/auth'
import { Button, Center, Loader, Spacer, Text } from '@baca/design-system'
import { isSignedInAtom, signOut } from '@baca/store/auth'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

const navigateToSignIn = () => router.replace('/sign-in')

export const ConfirmEmail = () => {
  const { code } = useLocalSearchParams<{ code: string }>()

  const {
    isError,
    isLoading,
    isSuccess,
    mutate: confirmEmailMutation,
  } = useAuthControllerConfirmEmail()

  useEffect(() => {
    if (code) {
      if (isSignedInAtom) {
        signOut()
      }
    }
  }, [code, confirmEmailMutation])

  return (
    <Center flexGrow={1}>
      {isLoading && (
        <Center gap={6}>
          <Loader type="bubbles" />
          <Text>Trwa weryfikowanie adresu e-mail ...</Text>
        </Center>
      )}
      {isError && (
        <Center>
          <Text>Ups nie udało się zweryfikować adresu email.</Text>
          <Spacer y={4} />
          <Button onPress={navigateToSignIn}>Wróć na stronę logowania</Button>
        </Center>
      )}
      {isSuccess && (
        <Center>
          <Text>Adres e-mail został pomyślnie potwierdzony.</Text>
          <Spacer y={4} />
          <Button onPress={navigateToSignIn}>Wróć na stronę logowania</Button>
        </Center>
      )}
    </Center>
  )
}
