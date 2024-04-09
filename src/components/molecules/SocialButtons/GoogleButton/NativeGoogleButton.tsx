import { useAuthGoogleControllerLogin } from '@baca/api/query/auth-social/auth-social'
import { ENV, isExpoGo, isWeb } from '@baca/constants'
import { useCallback, useEffect, useState } from '@baca/hooks'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom, store } from '@baca/store'
import { showErrorToast } from '@baca/utils'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SocialButton } from '../SocialButton'

let NativeGoogleButton: FC = () => undefined
if (!isExpoGo && !isWeb) {
  // Conditionally import makes it work with expo go
  import('@react-native-google-signin/google-signin').then(({ GoogleSignin, statusCodes }) => {
    type GoogleSignInError = Error & { code: keyof typeof statusCodes }

    NativeGoogleButton = () => {
      const [isDisabled, setIsDisabled] = useState(false)
      const { mutate: signInByGoogle } = useAuthGoogleControllerLogin()
      const { t } = useTranslation()

      useEffect(() => {
        // No extra configuration is needed,
        // but for the more customization check:
        // https://github.com/react-native-google-signin/google-signin#configureoptions
        GoogleSignin?.configure?.({
          webClientId: ENV.WEB_CLIENT_ID,
        })
      }, [])

      const verifyPlayServices = useCallback(async (): Promise<void> => {
        setIsDisabled(!(await GoogleSignin?.hasPlayServices?.()))
      }, [])

      useEffect(() => {
        verifyPlayServices()
      }, [verifyPlayServices])

      const verifyToken = useCallback(async (): Promise<void> => {
        const tokenResponse = await GoogleSignin?.getTokens?.()

        const { idToken } = tokenResponse || {}

        signInByGoogle(
          {
            data: {
              idToken,
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
        }
      }, [t, verifyToken])

      return <SocialButton disabled={isDisabled} onPress={signIn} type="google" />
    }
  })
}

export { NativeGoogleButton }
