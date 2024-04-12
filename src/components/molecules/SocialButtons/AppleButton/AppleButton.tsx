import { useAuthAppleControllerLogin } from '@baca/api/query/auth-social/auth-social'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom, store } from '@baca/store'
import * as ExpoAppleAuthentication from 'expo-apple-authentication'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'

import { SocialButton } from '../SocialButton'

type AppleButtonProps = {
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

export const AppleButton: FC<AppleButtonProps> = ({ isDisabled, setIsDisabled }) => {
  const { mutate: signInApple } = useAuthAppleControllerLogin()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showAppleButton, setShowAppleButton] = useState<boolean>(false)

  const checkIfAvailable = useCallback(async () => {
    const isAvailable = await ExpoAppleAuthentication.isAvailableAsync()
    setShowAppleButton(isAvailable)
  }, [])

  useEffect(() => {
    checkIfAvailable()
  }, [checkIfAvailable])

  const onPress = useCallback(async () => {
    setIsDisabled(true)
    setIsLoading(true)
    try {
      const appleResponse = await ExpoAppleAuthentication.signInAsync({
        requestedScopes: [
          ExpoAppleAuthentication.AppleAuthenticationScope.EMAIL,
          ExpoAppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      })

      console.log(
        JSON.stringify(
          {
            data: {
              idToken: appleResponse.identityToken!,
              firstName: appleResponse.fullName?.givenName || '',
              lastName: appleResponse.fullName?.familyName || '',
            },
          },
          null,
          2
        )
      )
      signInApple(
        {
          data: {
            idToken: appleResponse.identityToken!,
            firstName: appleResponse.fullName?.givenName || '',
            lastName: appleResponse.fullName?.familyName || '',
          },
        },

        {
          onError: (e) => {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              console.log('Request cancelled by the user')
            } else return e
          },
          onSuccess: async (response) => {
            const { user, ...token } = response
            if (token) {
              await setToken(token)
            }
            store.set(isSignedInAtom, true)

            // Send push token to backend
            await assignPushToken()
          },
        }
      )
    } catch (e) {
      console.log('Cannot login with apple', e)
    } finally {
      setIsLoading(false)
      setIsDisabled(false)
    }
  }, [setIsDisabled, signInApple])

  if (!showAppleButton) return null

  return <SocialButton disabled={isDisabled} loading={isLoading} type="apple" onPress={onPress} />
}
