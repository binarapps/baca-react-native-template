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

import type { ArticleEntity } from '../../types'

export const getArticlesControllerCreateResponseMock = (
  overrideResponse: any = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
    ...overrideResponse,
  },
  authorId: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  body: faker.word.sample(),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  description: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  id: faker.number.int({ min: undefined, max: undefined }),
  published: faker.datatype.boolean(),
  title: faker.word.sample(),
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getArticlesControllerFindAllResponseMock = (
  overrideResponse: any = {}
): ArticleEntity[] =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    author: {
      email: faker.word.sample(),
      firstName: faker.word.sample(),
      lastName: faker.word.sample(),
      ...overrideResponse,
    },
    authorId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.word.sample(), null]),
      undefined,
    ]),
    body: faker.word.sample(),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    description: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.word.sample(), null]),
      undefined,
    ]),
    id: faker.number.int({ min: undefined, max: undefined }),
    published: faker.datatype.boolean(),
    title: faker.word.sample(),
    updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    ...overrideResponse,
  }))

export const getArticlesControllerFindDraftsResponseMock = (
  overrideResponse: any = {}
): ArticleEntity[] =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    author: {
      email: faker.word.sample(),
      firstName: faker.word.sample(),
      lastName: faker.word.sample(),
      ...overrideResponse,
    },
    authorId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.word.sample(), null]),
      undefined,
    ]),
    body: faker.word.sample(),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    description: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.word.sample(), null]),
      undefined,
    ]),
    id: faker.number.int({ min: undefined, max: undefined }),
    published: faker.datatype.boolean(),
    title: faker.word.sample(),
    updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    ...overrideResponse,
  }))

export const getArticlesControllerFindOneResponseMock = (
  overrideResponse: any = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
    ...overrideResponse,
  },
  authorId: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  body: faker.word.sample(),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  description: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  id: faker.number.int({ min: undefined, max: undefined }),
  published: faker.datatype.boolean(),
  title: faker.word.sample(),
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getArticlesControllerUpdateResponseMock = (
  overrideResponse: any = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
    ...overrideResponse,
  },
  authorId: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  body: faker.word.sample(),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  deletedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  description: faker.helpers.arrayElement([
    faker.helpers.arrayElement([faker.word.sample(), null]),
    undefined,
  ]),
  id: faker.number.int({ min: undefined, max: undefined }),
  published: faker.datatype.boolean(),
  title: faker.word.sample(),
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getArticlesControllerCreateMockHandler = (overrideResponse?: ArticleEntity) => {
  return http.post('*/api/v1/articles', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getArticlesControllerCreateResponseMock()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getArticlesControllerFindAllMockHandler = (overrideResponse?: ArticleEntity[]) => {
  return http.get('*/api/v1/articles', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getArticlesControllerFindAllResponseMock()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getArticlesControllerFindDraftsMockHandler = (overrideResponse?: ArticleEntity[]) => {
  return http.get('*/api/v1/articles/drafts', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getArticlesControllerFindDraftsResponseMock()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getArticlesControllerFindOneMockHandler = (overrideResponse?: ArticleEntity) => {
  return http.get('*/api/v1/articles/:id', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getArticlesControllerFindOneResponseMock()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getArticlesControllerUpdateMockHandler = (overrideResponse?: ArticleEntity) => {
  return http.patch('*/api/v1/articles/:id', async () => {
    await delay(1000)
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getArticlesControllerUpdateResponseMock()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}

export const getArticlesControllerRemoveMockHandler = () => {
  return http.delete('*/api/v1/articles/:id', async () => {
    await delay(1000)
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}
export const getArticlesMock = () => [
  getArticlesControllerCreateMockHandler(),
  getArticlesControllerFindAllMockHandler(),
  getArticlesControllerFindDraftsMockHandler(),
  getArticlesControllerFindOneMockHandler(),
  getArticlesControllerUpdateMockHandler(),
  getArticlesControllerRemoveMockHandler(),
]
