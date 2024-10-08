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
  overrideResponse: Partial<ArticleEntity> = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
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

export const getArticlesControllerFindAllResponseMock = (): ArticleEntity[] =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    author: {
      email: faker.word.sample(),
      firstName: faker.word.sample(),
      lastName: faker.word.sample(),
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
  }))

export const getArticlesControllerFindDraftsResponseMock = (): ArticleEntity[] =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    author: {
      email: faker.word.sample(),
      firstName: faker.word.sample(),
      lastName: faker.word.sample(),
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
  }))

export const getArticlesControllerFindOneResponseMock = (
  overrideResponse: Partial<ArticleEntity> = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
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
  overrideResponse: Partial<ArticleEntity> = {}
): ArticleEntity => ({
  author: {
    email: faker.word.sample(),
    firstName: faker.word.sample(),
    lastName: faker.word.sample(),
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

export const getArticlesControllerCreateMockHandler = (
  overrideResponse?:
    | ArticleEntity
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<ArticleEntity> | ArticleEntity)
) => {
  return http.post('*/api/v1/articles', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getArticlesControllerCreateResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getArticlesControllerFindAllMockHandler = (
  overrideResponse?:
    | ArticleEntity[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0]
      ) => Promise<ArticleEntity[]> | ArticleEntity[])
) => {
  return http.get('*/api/v1/articles', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getArticlesControllerFindAllResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getArticlesControllerFindDraftsMockHandler = (
  overrideResponse?:
    | ArticleEntity[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0]
      ) => Promise<ArticleEntity[]> | ArticleEntity[])
) => {
  return http.get('*/api/v1/articles/drafts', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getArticlesControllerFindDraftsResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getArticlesControllerFindOneMockHandler = (
  overrideResponse?:
    | ArticleEntity
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0]
      ) => Promise<ArticleEntity> | ArticleEntity)
) => {
  return http.get('*/api/v1/articles/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getArticlesControllerFindOneResponseMock()
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getArticlesControllerUpdateMockHandler = (
  overrideResponse?:
    | ArticleEntity
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0]
      ) => Promise<ArticleEntity> | ArticleEntity)
) => {
  return http.patch('*/api/v1/articles/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getArticlesControllerUpdateResponseMock()
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getArticlesControllerRemoveMockHandler = (
  overrideResponse?:
    | void
    | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<void> | void)
) => {
  return http.delete('*/api/v1/articles/:id', async (info) => {
    await delay(1000)
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info)
    }
    return new HttpResponse(null, { status: 204 })
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
