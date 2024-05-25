import { useEffect } from '@baca/hooks'
import { getToken } from '@baca/services'
import { isSignedInAtom } from '@baca/store/auth'
import { useSetAtom } from 'jotai'
import { FC } from 'react'

export const AuthLogic: FC = () => {
  const setIsSignedIn = useSetAtom(isSignedInAtom)

  useEffect(() => {
    const bootstrap = async () => {
      // TODO: This should be moved to backend calls, in this bootstrap function we should fetch user info and not token
      const token = await getToken()

      setIsSignedIn(!!token?.accessToken)
    }

    bootstrap()
  }, [setIsSignedIn])

  return null
}
