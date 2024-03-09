import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { GoogleButton } from './GoogleButton'

import { isExpoGo } from '@baca/constants'
import { useCallback, useEffect, useState } from '@baca/hooks'
import { useAuthGoogleControllerLogin } from '@baca/api/query/auth-social/auth-social'

let NativeGoogleButton: FC

if (!isExpoGo) {
  // Conditionall import makes it work with expo go
  import('@react-native-google-signin/google-signin').then(({ GoogleSignin, statusCodes }) => {
    type GoogleSignInError = Error & { code: keyof typeof statusCodes }

    NativeGoogleButton = () => {
      const [isDisabled, setIsDisabled] = useState(false)
      const { mutate: signInByGoogle } = useAuthGoogleControllerLogin()
      const { t } = useTranslation()

      useEffect(() => {
        // No extra configuration is needed,
        // but for the more customisation check:
        // https://github.com/react-native-google-signin/google-signin#configureoptions
        GoogleSignin?.configure?.()
      }, [])

      const verifyPlayServices = useCallback(async (): Promise<void> => {
        setIsDisabled(!(await GoogleSignin?.hasPlayServices?.()))
      }, [])

      useEffect(() => {
        verifyPlayServices()
      }, [verifyPlayServices])

      const verifyToken = useCallback(async (): Promise<void> => {
        const tokenResponse = await GoogleSignin?.getTokens?.()
        const { accessToken } = tokenResponse || {}
        await signInByGoogle({
          data: {
            idToken: accessToken,
          },
        })
      }, [signInByGoogle])

      const signIn = useCallback(async (): Promise<void> => {
        try {
          await GoogleSignin?.signIn?.()
          await verifyToken()
        } catch (error) {
          // TODO: This could be extracted to external function with an additional handling of the error codes
          const typedError = error as GoogleSignInError

          if (typedError.code) {
            switch (typedError.code) {
              case statusCodes?.SIGN_IN_CANCELLED:
              case statusCodes?.IN_PROGRESS:
                break
              case statusCodes?.PLAY_SERVICES_NOT_AVAILABLE:
                // TODO: wait for toast components
                alert(t('errors.play_services_not_available'))
                break
              default:
                alert(t('errors.something_went_wrong'))
                break
            }
            return
          }

          alert(t('errors.something_went_wrong'))
        }
      }, [t, verifyToken])

      return <GoogleButton onPress={signIn} isDisabled={isDisabled} />
    }
  })
}

export { NativeGoogleButton }
