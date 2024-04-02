import { useAuthControllerMe } from '@baca/api/query/auth/auth'
import { Box, Button, ScrollView, Text } from '@baca/design-system'
import { Token, getToken } from '@baca/services'
import { isRefreshingTokenAtom } from '@baca/store'
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
  }, [refetch])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])

  return (
    <ScrollView gap={4} pb={8} px={8}>
      <Box>
        <Text.LgBold>User data:</Text.LgBold>
        <Text.LgMedium>
          Is fetching user data:
          {JSON.stringify(isInitialLoading || isRefetching, null, 10)}
        </Text.LgMedium>
        <Text.MdRegular>{JSON.stringify(data, null, 10)}</Text.MdRegular>
      </Box>
      <Button loading={isRefetching} onPress={fetchUser} title="Refetch user" />
      <Box>
        <Text.LgBold>Refresh token:</Text.LgBold>
        <Text.LgMedium>Is refreshing token:{JSON.stringify(isRefreshing, null, 2)}</Text.LgMedium>
        <Text.MdRegular>
          {JSON.stringify(
            { ...token, expDate: new Date(token?.tokenExpires || 0).toLocaleString() },
            null,
            2
          )}
        </Text.MdRegular>
      </Box>
      <Button onPress={fetchToken} title="Try to get new token if needed" />
    </ScrollView>
  )
}
