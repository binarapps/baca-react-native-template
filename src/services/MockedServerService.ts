// FIXME: Fix the issue with the msw/native package
// - https://github.com/mswjs/msw/issues/2344
// - https://github.com/mswjs/msw/issues/2367

// import 'text-encoding-polyfill'
// import 'fast-text-encoding'
// import 'react-native-url-polyfill/auto'

// import { setupServer } from 'msw/native'

// import { getArticlesMock } from '@/api/query/articles/articles.msw'
// import { getAuthMock } from '@/api/query/auth/auth.msw'
// import { getAuthSocialMock } from '@/api/query/auth-social/auth-social.msw'
// import { getFilesMock } from '@/api/query/files/files.msw'
// import { getUsersMock } from '@/api/query/users/users.msw'

// export const startMockedServer = (): void => {
//   const server = setupServer(
//     ...getAuthMock(),
//     ...getUsersMock(),
//     ...getFilesMock(),
//     ...getAuthSocialMock(),
//     ...getArticlesMock()
//   )

//   server.listen({ onUnhandledRequest: 'bypass' })
// }

export const startMockedServer = (): void => {}
