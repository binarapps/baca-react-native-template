/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import { faker } from '@faker-js/faker'
import { HttpResponse, delay, http } from 'msw'

import type { AuthEntity, RefreshEntity, UserEntity } from '../../types'

export const getAuthControllerLoginResponseMock = (
  overrideResponse: Partial<AuthEntity> = {}
): AuthEntity => ({
  accessToken: faker.word.sample(),
  refreshToken: faker.word.sample(),
  tokenExpires: faker.number.int({ min: undefined, max: undefined }),
  user: {
    consent: faker.helpers.arrayElement([
      {
        createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
        privacyPolicyAccepted: faker.datatype.boolean(),
        privacyPolicyVersion: faker.word.sample(),
        termsAccepted: faker.datatype.boolean(),
        termsVersion: faker.word.sample(),
        updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      },
      undefined,
    ]),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    id: faker.word.sample(),
    lastName: faker.word.sample(),
    locale: faker.word.sample(),
    provider: faker.word.sample(),
    role: {
      id: faker.helpers.arrayElement([1, 2] as const),
      name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
    },
    socialId: faker.word.sample(),
    status: { id: faker.number.int({ min: undefined, max: undefined }), name: faker.word.sample() },
    updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  },
  ...overrideResponse,
})

export const getAuthControllerRegisterResponseMock = (
  overrideResponse: Partial<UserEntity> = {}
): UserEntity => ({
  consent: faker.helpers.arrayElement([
    {
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      privacyPolicyAccepted: faker.datatype.boolean(),
      privacyPolicyVersion: faker.word.sample(),
      termsAccepted: faker.datatype.boolean(),
      termsVersion: faker.word.sample(),
      updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    },
    undefined,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  email: faker.word.sample(),
  firstName: faker.word.sample(),
  id: faker.word.sample(),
  lastName: faker.word.sample(),
  locale: faker.word.sample(),
  provider: faker.word.sample(),
  role: {
    id: faker.helpers.arrayElement([1, 2] as const),
    name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
  },
  socialId: faker.word.sample(),
  status: { id: faker.number.int({ min: undefined, max: undefined }), name: faker.word.sample() },
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getAuthControllerMeResponseMock = (
  overrideResponse: Partial<UserEntity> = {}
): UserEntity => ({
  consent: faker.helpers.arrayElement([
    {
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      privacyPolicyAccepted: faker.datatype.boolean(),
      privacyPolicyVersion: faker.word.sample(),
      termsAccepted: faker.datatype.boolean(),
      termsVersion: faker.word.sample(),
      updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    },
    undefined,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  email: faker.word.sample(),
  firstName: faker.word.sample(),
  id: faker.word.sample(),
  lastName: faker.word.sample(),
  locale: faker.word.sample(),
  provider: faker.word.sample(),
  role: {
    id: faker.helpers.arrayElement([1, 2] as const),
    name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
  },
  socialId: faker.word.sample(),
  status: { id: faker.number.int({ min: undefined, max: undefined }), name: faker.word.sample() },
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getAuthControllerRefreshResponseMock = (
  overrideResponse: Partial<RefreshEntity> = {}
): RefreshEntity => ({
  accessToken: faker.word.sample(),
  refreshToken: faker.word.sample(),
  tokenExpires: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
})

export const getAuthControllerLoginMockHandler = (
  overrideResponse?:
    | AuthEntity
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<AuthEntity> | AuthEntity)
) => {
  return http.post('*/api/v1/auth/email/login', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthControllerLoginResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthControllerRegisterMockHandler = (
  overrideResponse?:
    | UserEntity
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<UserEntity> | UserEntity)
) => {
  return http.post('*/api/v1/auth/email/register', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthControllerRegisterResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthControllerConfirmEmailMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/email/confirm', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerResendVerificationEmailMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/email/resend', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerForgotPasswordMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/forgot/password', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerResetPasswordMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/reset/password', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerEmailChangeMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/email/change', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerConfirmEmailChangeMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/email/change-confirm', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerMeMockHandler = (
  overrideResponse?:
    | UserEntity
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<UserEntity> | UserEntity)
) => {
  return http.get('*/api/v1/auth/me', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthControllerMeResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthControllerUpdateMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.patch('*/api/v1/auth/me', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerDeleteMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.delete('*/api/v1/auth/me', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerRefreshMockHandler = (
  overrideResponse?:
    | RefreshEntity
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<RefreshEntity> | RefreshEntity)
) => {
  return http.post('*/api/v1/auth/refresh', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthControllerRefreshResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthControllerLogoutMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/logout', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}

export const getAuthControllerLogoutAllMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<unknown> | unknown)
) => {
  return http.post('*/api/v1/auth/logout/all', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 200 })
  })
}
export const getAuthMock = () => [
  getAuthControllerLoginMockHandler(),
  getAuthControllerRegisterMockHandler(),
  getAuthControllerConfirmEmailMockHandler(),
  getAuthControllerResendVerificationEmailMockHandler(),
  getAuthControllerForgotPasswordMockHandler(),
  getAuthControllerResetPasswordMockHandler(),
  getAuthControllerEmailChangeMockHandler(),
  getAuthControllerConfirmEmailChangeMockHandler(),
  getAuthControllerMeMockHandler(),
  getAuthControllerUpdateMockHandler(),
  getAuthControllerDeleteMockHandler(),
  getAuthControllerRefreshMockHandler(),
  getAuthControllerLogoutMockHandler(),
  getAuthControllerLogoutAllMockHandler(),
]
