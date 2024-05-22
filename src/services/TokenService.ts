import { AuthControllerRefreshMutationResult } from '@baca/api/query/auth/auth'
import { ASYNC_STORAGE_KEYS, ENV } from '@baca/constants'
import { decodeAccessToken, secureStore, wait } from '@baca/utils'

import { isRefreshingTokenAtom, logoutMessageShownAtom } from '../store/global'
import { store } from '../store/store'

const { USER_TOKEN } = ASYNC_STORAGE_KEYS

// CONFIG: Modify this type with token value that is accepted by your backend
export type Token = {
  accessToken: string
  refreshToken: string
  tokenExpires: number
}

export function setToken(token: Token) {
  return secureStore.setItem(USER_TOKEN, JSON.stringify(token))
}

export async function getToken(): Promise<Token | undefined> {
  const stringifiedToken = await secureStore.getItem(USER_TOKEN)

  if (!stringifiedToken) {
    return
  }
  const token = JSON.parse(stringifiedToken)
  const newToken = await refreshTokenIfNeeded(token)

  return newToken
}

export async function deleteToken() {
  const token = await secureStore.getItem(USER_TOKEN)

  if (!token) return

  return secureStore.removeItem(USER_TOKEN)
}

export const refreshTokenIfNeeded = async (token: Token): Promise<Token> => {
  try {
    const decodedToken = decodeAccessToken(token.accessToken)
    const expirationTime = (decodedToken?.exp ?? 0) * 1000

    const logoutMessageShown = store.get(logoutMessageShownAtom)
    const isRefreshingToken = store.get(isRefreshingTokenAtom)

    // If token doesn't have expiration time we are returning this token
    if (!expirationTime || logoutMessageShown) {
      return token
    }

    // CONFIG: add time when to refetch token before current token expiration f.e. 1 hour -> 1000 * 60 * 60
    // Current time - 14.9 minute
    // If token is valid for 20 minute, it will be refreshed after 6 minutes
    // Current time is set like that to easily test this logic, but in production app it could be 1 or 2 minutes
    const timeBeforeTokenShouldBeRefetched = 1000 * 60 * 14.9

    const refetchTriggerTime = Date.now() + timeBeforeTokenShouldBeRefetched
    const shouldRefreshToken = expirationTime < Math.round(refetchTriggerTime)

    // If token is still refreshing and there is no logout message shown app should try again to get token after 0.5 second
    if (isRefreshingToken) {
      await wait(500)
      const savedToken = await getToken()

      if (savedToken) {
        return savedToken
      }
    }
    // If token is expired and app is trying to fetch new token using refresh token
    if (shouldRefreshToken && !isRefreshingToken) {
      store.set(isRefreshingTokenAtom, true)

      const refreshedToken: AuthControllerRefreshMutationResult = await fetch(
        `${ENV.API_URL}api/v1/auth/refresh`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token.refreshToken}` },
        }
      ).then((response) => response.json())

      if (token) {
        await setToken(refreshedToken)
      } else {
        console.log('THERE IS NO TOKEN ! ')
      }

      store.set(isRefreshingTokenAtom, false)

      return refreshedToken
    }

    // If token is not expired app is returning token that was provided in params
    store.set(isRefreshingTokenAtom, false)
    return token
  } catch {
    store.set(isRefreshingTokenAtom, false)
    return token
  }
}
