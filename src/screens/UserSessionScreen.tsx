import { useAuthControllerMe } from '@baca/api/query/auth/auth'
import { HelperRenderJson, HelperSection } from '@baca/components'
import { Button, ScrollView, Text } from '@baca/design-system'
import { Token, getToken } from '@baca/services'
import { isRefreshingTokenAtom } from '@baca/store'
import { wait } from '@baca/utils'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'

export const UserSessionScreen = () => {
  const isRefreshing = useAtomValue(isRefreshingTokenAtom)
  const { data, refetch, isInitialLoading, isRefetching } = useAuthControllerMe({
    query: { enabled: false },
  })

  const [token, setToken] = useState<Token | null>(null)

  const fetchToken = useCallback(async () => {
    const token = await getToken()
    if (token) {
      setToken(token)
    }
  }, [])

  const fetchUser = useCallback(async () => {
    await refetch()

    // Refetch function could refresh token, so we are fetching it from store again
    await wait(100)
    await fetchToken()
  }, [fetchToken, refetch])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])

  return (
    <ScrollView flexGrow={1} p={4}>
      <HelperSection header="User data">
        <Text.MdMedium>Is fetching user data:</Text.MdMedium>
        <HelperRenderJson>{isInitialLoading || isRefetching}</HelperRenderJson>
        <Text.MdMedium>User data:</Text.MdMedium>
        <HelperRenderJson>{data}</HelperRenderJson>
        <Button loading={isRefetching} onPress={fetchUser} title="Refetch user" />
      </HelperSection>

      <HelperSection header="Refresh token">
        <Text.MdMedium>Is refreshing token:</Text.MdMedium>
        <HelperRenderJson>{isRefreshing}</HelperRenderJson>
        <Text.MdMedium>Refresh token:</Text.MdMedium>
        <HelperRenderJson>
          {{ ...token, expDate: new Date(token?.tokenExpires || 0).toLocaleString() }}
        </HelperRenderJson>
        <Button onPress={fetchToken} title="Try to get new token if needed" />
      </HelperSection>
    </ScrollView>
  )
}
