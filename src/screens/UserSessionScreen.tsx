import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'

import { useAuthControllerMe } from '@/api/query/auth/auth'
import { HelperRenderJson, HelperSection } from '@/components'
import { Button, ScrollView, Text } from '@/design-system'
import { Token, getToken } from '@/services'
import { isRefreshingTokenAtom } from '@/store'
import { wait } from '@/utils'

export const UserSessionScreen = () => {
  const isRefreshing = useAtomValue(isRefreshingTokenAtom)
  const { data, refetch, isPending, isRefetching } = useAuthControllerMe({
    query: {
      enabled: false,
    },
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
        <HelperRenderJson>{isPending || isRefetching}</HelperRenderJson>
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
