import { useAuthFacebookControllerLogin } from '@baca/api/query/auth-social/auth-social'
import { isExpoGo, isWeb } from '@baca/constants'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom, store } from '@baca/store'

import { SocialButton } from '../SocialButton'

export const NativeFacebookButton = () => {
  const { mutate: loginWithFacebook } = useAuthFacebookControllerLogin()

  if (isExpoGo || isWeb) return null

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { AccessToken, LoginManager } = require('react-native-fbsdk-next')

  const handleLogin = async () => {
    await LoginManager.logInWithPermissions(['email', 'public_profile'], 'enabled')

    const { accessToken } = (await AccessToken.getCurrentAccessToken()) || {}

    accessToken &&
      loginWithFacebook(
        { data: { accessToken } },
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
  }

  // eslint-disable-next-line react/jsx-no-bind
  return <SocialButton type="facebook" onPress={handleLogin} />
}
