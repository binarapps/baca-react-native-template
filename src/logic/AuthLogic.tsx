import { useSetAtom } from 'jotai'
import { FC } from 'react'

import { useEffect } from '~hooks'
import { getToken } from '~services'
import { isSignedInAtom } from '~store/auth'

export const AuthLogic: FC = () => {
  const setIsSignedIn = useSetAtom(isSignedInAtom)

  useEffect(() => {
    const bootstrap = async () => {
      // TODO: This should be moved to backend calls, in this bootstrap function we should fetch user info and not token
      const token = await getToken()
      setIsSignedIn(!!token)
    }

    bootstrap()
  }, [setIsSignedIn])

  return null
}
