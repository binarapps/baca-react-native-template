import 'text-encoding-polyfill'
import 'fast-text-encoding'
import 'react-native-url-polyfill/auto'

import { getArticlesMock } from '@baca/api/query/articles/articles.msw'
import { getAuthMock } from '@baca/api/query/auth/auth.msw'
import { getAuthSocialMock } from '@baca/api/query/auth-social/auth-social.msw'
import { getFilesMock } from '@baca/api/query/files/files.msw'
import { getUsersMock } from '@baca/api/query/users/users.msw'
import { setupServer } from 'msw/native'

export const startMockedServer = (): void => {
  const server = setupServer(
    ...getAuthMock(),
    ...getUsersMock(),
    ...getFilesMock(),
    ...getAuthSocialMock(),
    ...getArticlesMock()
  )

  server.listen({ onUnhandledRequest: 'bypass' })
}
