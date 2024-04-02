import { ASYNC_STORAGE_KEYS, ENV } from '@baca/constants'
import { isRefreshingTokenAtom, logoutMessageShownAtom, store } from '@baca/store'
import { decodeAccessToken, secureStore, wait } from '@baca/utils'

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

    const refetchTriggerTime = Date.now() + 1000 * 14.9 * 60 //CONFIG: add time when to refetch token before current token expiration f.e. 1 hour -> 1000 * 60 * 60
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

      // const refreshedToken: AuthControllerRefreshMutationResult = (await fetch(  //FIXME: uncomment this line when type from BE will be improved
      const refreshedToken = (await fetch(`${ENV.API_URL}api/v1/auth/refresh`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.refreshToken}` },
      }).then((response) => response.json())) as unknown as Token //FIXME: remove when type from BE will be correct

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
