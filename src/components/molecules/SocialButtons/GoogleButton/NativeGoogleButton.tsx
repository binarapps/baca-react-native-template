import { useAuthGoogleControllerLogin } from '@baca/api/query/auth-social/auth-social'
import { ENV, isExpoGo, isWeb } from '@baca/constants'
import { useCallback, useEffect, useState } from '@baca/hooks'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom, store } from '@baca/store'
import { showErrorToast } from '@baca/utils'
import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { SocialButton } from '../SocialButton'

export type GoogleButtonProps = {
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

let NativeGoogleButton: FC<GoogleButtonProps> = () => null

if (!isExpoGo && !isWeb) {
  // Conditionally import makes it work with expo go
  import('@react-native-google-signin/google-signin').then(({ GoogleSignin, statusCodes }) => {
    type GoogleSignInError = Error & { code: keyof typeof statusCodes }

    NativeGoogleButton = ({ isDisabled, setIsDisabled }) => {
      const { t } = useTranslation()
      const { mutate: signInByGoogle } = useAuthGoogleControllerLogin()

      const [isGoogleButtonDisabled, setIsGoogleButtonDisabled] = useState<boolean>(false)
      const [isLoading, setIsLoading] = useState(false)

      useEffect(() => {
        // No extra configuration is needed,
        // but for the more customization check:
        // https://github.com/react-native-google-signin/google-signin#configureoptions
        GoogleSignin?.configure?.({
          webClientId: ENV.WEB_CLIENT_ID,
        })
      }, [])

      const verifyPlayServices = useCallback(async (): Promise<void> => {
        setIsGoogleButtonDisabled(!(await GoogleSignin?.hasPlayServices?.()))
      }, [])

      useEffect(() => {
        verifyPlayServices()
      }, [verifyPlayServices])

      const verifyToken = useCallback(async (): Promise<void> => {
        const tokenResponse = await GoogleSignin?.getTokens?.()

        const { accessToken } = tokenResponse || {}

        signInByGoogle(
          {
            data: {
              accessToken,
            },
          },
          {
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
      }, [signInByGoogle])

      const signIn = useCallback(async (): Promise<void> => {
        setIsLoading(true)
        setIsDisabled(true)
        try {
          await GoogleSignin?.signIn?.()
          await verifyToken()
        } catch (error) {
          // TODO: This could be extracted to external function with an additional handling of the error codes
          const typedError = error as GoogleSignInError

          if (typedError?.code) {
            switch (typedError.code) {
              case statusCodes?.SIGN_IN_CANCELLED:
              case statusCodes?.IN_PROGRESS:
                break
              case statusCodes?.PLAY_SERVICES_NOT_AVAILABLE:
                showErrorToast({ description: t('errors.play_services_not_available') })
                break
              default:
                showErrorToast({ description: t('errors.something_went_wrong') })
                break
            }
            return
          }

          showErrorToast({ description: t('errors.something_went_wrong') })
        } finally {
          setIsDisabled(false)
          setIsLoading(false)
        }
      }, [setIsDisabled, t, verifyToken])

      return (
        <SocialButton
          disabled={isGoogleButtonDisabled || isDisabled}
          loading={isLoading}
          onPress={signIn}
          type="google"
        />
      )
    }
  })
}

export { NativeGoogleButton }
