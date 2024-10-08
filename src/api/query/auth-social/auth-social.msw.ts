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

import type { AuthEntity } from '../../types'

export const getAuthGoogleControllerLoginResponseMock = (
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

export const getAuthFacebookControllerLoginResponseMock = (
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

export const getAuthAppleControllerLoginResponseMock = (
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

export const getAuthGoogleControllerLoginMockHandler = (
  overrideResponse?:
    | AuthEntity
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<AuthEntity> | AuthEntity)
) => {
  return http.post('*/api/v1/auth/google/login', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthGoogleControllerLoginResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthFacebookControllerLoginMockHandler = (
  overrideResponse?:
    | AuthEntity
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<AuthEntity> | AuthEntity)
) => {
  return http.post('*/api/v1/auth/facebook/login', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthFacebookControllerLoginResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getAuthAppleControllerLoginMockHandler = (
  overrideResponse?:
    | AuthEntity
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<AuthEntity> | AuthEntity)
) => {
  return http.post('*/api/v1/auth/apple/login', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getAuthAppleControllerLoginResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}
export const getAuthSocialMock = () => [
  getAuthGoogleControllerLoginMockHandler(),
  getAuthFacebookControllerLoginMockHandler(),
  getAuthAppleControllerLoginMockHandler(),
]
