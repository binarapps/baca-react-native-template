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

export const getAuthControllerLoginResponseMock = (overrideResponse: any = {}): AuthEntity => ({
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
        ...overrideResponse,
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
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
      ...overrideResponse,
    },
    socialId: faker.word.sample(),
    status: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse,
    },
    updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    ...overrideResponse,
  },
  ...overrideResponse,
})

export const getAuthControllerRegisterResponseMock = (overrideResponse: any = {}): UserEntity => ({
  consent: faker.helpers.arrayElement([
    {
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      privacyPolicyAccepted: faker.datatype.boolean(),
      privacyPolicyVersion: faker.word.sample(),
      termsAccepted: faker.datatype.boolean(),
      termsVersion: faker.word.sample(),
      updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      ...overrideResponse,
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
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
    ...overrideResponse,
  },
  socialId: faker.word.sample(),
  status: {
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    ...overrideResponse,
  },
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getAuthControllerMeResponseMock = (overrideResponse: any = {}): UserEntity => ({
  consent: faker.helpers.arrayElement([
    {
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      privacyPolicyAccepted: faker.datatype.boolean(),
      privacyPolicyVersion: faker.word.sample(),
      termsAccepted: faker.datatype.boolean(),
      termsVersion: faker.word.sample(),
      updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      ...overrideResponse,
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
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.helpers.arrayElement(['ADMIN', 'USER'] as const),
    ...overrideResponse,
  },
  socialId: faker.word.sample(),
  status: {
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    ...overrideResponse,
  },
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getAuthControllerRefreshResponseMock = (
  overrideResponse: any = {}
): RefreshEntity => ({
  accessToken: faker.word.sample(),
  refreshToken: faker.word.sample(),
  tokenExpires: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
})

export const getAuthControllerLoginMockHandler = (overrideResponse?: AuthEntity) => {
  return http.post('/api/v1/auth/email/login', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(overrideResponse ? overrideResponse : getAuthControllerLoginResponseMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getAuthControllerRegisterMockHandler = (overrideResponse?: UserEntity) => {
  return http.post('/api/v1/auth/email/register', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(overrideResponse ? overrideResponse : getAuthControllerRegisterResponseMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getAuthControllerConfirmEmailMockHandler = () => {
  return http.post('/api/v1/auth/email/confirm', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerResendVerificationEmailMockHandler = () => {
  return http.post('/api/v1/auth/email/resend', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerForgotPasswordMockHandler = () => {
  return http.post('/api/v1/auth/forgot/password', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerResetPasswordMockHandler = () => {
  return http.post('/api/v1/auth/reset/password', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerEmailChangeMockHandler = () => {
  return http.post('/api/v1/auth/email/change', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerConfirmEmailChangeMockHandler = () => {
  return http.post('/api/v1/auth/email/change-confirm', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerMeMockHandler = (overrideResponse?: UserEntity) => {
  return http.get('/api/v1/auth/me', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(overrideResponse ? overrideResponse : getAuthControllerMeResponseMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getAuthControllerUpdateMockHandler = () => {
  return http.patch('/api/v1/auth/me', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerDeleteMockHandler = () => {
  return http.delete('/api/v1/auth/me', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerRefreshMockHandler = (overrideResponse?: RefreshEntity) => {
  return http.post('/api/v1/auth/refresh', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(overrideResponse ? overrideResponse : getAuthControllerRefreshResponseMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getAuthControllerLogoutMockHandler = () => {
  return http.post('/api/v1/auth/logout', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const getAuthControllerLogoutAllMockHandler = () => {
  return http.post('/api/v1/auth/logout/all', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
