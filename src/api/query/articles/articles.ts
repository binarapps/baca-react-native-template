/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { customInstance } from '../../axios/custom-instance'
import type { ErrorType, BodyType } from '../../axios/custom-instance'
import type {
  ArticleEntity,
  ArticlesControllerFindAllParams,
  ArticlesControllerFindDraftsParams,
  CreateArticleDto,
  UpdateArticleDto,
} from '../../types'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const articlesControllerCreate = (
  createArticleDto: BodyType<CreateArticleDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ArticleEntity>(
    {
      url: `/api/v1/articles`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createArticleDto,
    },
    options
  )
}

export const getArticlesControllerCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerCreate>>,
    TError,
    { data: BodyType<CreateArticleDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesControllerCreate>>,
  TError,
  { data: BodyType<CreateArticleDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesControllerCreate>>,
    { data: BodyType<CreateArticleDto> }
  > = (props) => {
    const { data } = props ?? {}

    return articlesControllerCreate(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ArticlesControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerCreate>>
>
export type ArticlesControllerCreateMutationBody = BodyType<CreateArticleDto>
export type ArticlesControllerCreateMutationError = ErrorType<unknown>

export const useArticlesControllerCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerCreate>>,
    TError,
    { data: BodyType<CreateArticleDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getArticlesControllerCreateMutationOptions(options)

  return useMutation(mutationOptions)
}
export const articlesControllerFindAll = (
  params: ArticlesControllerFindAllParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ArticleEntity[]>(
    { url: `/api/v1/articles`, method: 'GET', params, signal },
    options
  )
}

export const getArticlesControllerFindAllQueryKey = (params: ArticlesControllerFindAllParams) => {
  return [`/api/v1/articles`, ...(params ? [params] : [])] as const
}

export const getArticlesControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesControllerFindAll>>,
  TError = ErrorType<unknown>
>(
  params: ArticlesControllerFindAllParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindAll>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getArticlesControllerFindAllQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof articlesControllerFindAll>>> = ({
    signal,
  }) => articlesControllerFindAll(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ArticlesControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerFindAll>>
>
export type ArticlesControllerFindAllQueryError = ErrorType<unknown>

export const useArticlesControllerFindAll = <
  TData = Awaited<ReturnType<typeof articlesControllerFindAll>>,
  TError = ErrorType<unknown>
>(
  params: ArticlesControllerFindAllParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindAll>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesControllerFindAllQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const articlesControllerFindDrafts = (
  params: ArticlesControllerFindDraftsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ArticleEntity[]>(
    { url: `/api/v1/articles/drafts`, method: 'GET', params, signal },
    options
  )
}

export const getArticlesControllerFindDraftsQueryKey = (
  params: ArticlesControllerFindDraftsParams
) => {
  return [`/api/v1/articles/drafts`, ...(params ? [params] : [])] as const
}

export const getArticlesControllerFindDraftsQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesControllerFindDrafts>>,
  TError = ErrorType<unknown>
>(
  params: ArticlesControllerFindDraftsParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindDrafts>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getArticlesControllerFindDraftsQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof articlesControllerFindDrafts>>> = ({
    signal,
  }) => articlesControllerFindDrafts(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesControllerFindDrafts>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ArticlesControllerFindDraftsQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerFindDrafts>>
>
export type ArticlesControllerFindDraftsQueryError = ErrorType<unknown>

export const useArticlesControllerFindDrafts = <
  TData = Awaited<ReturnType<typeof articlesControllerFindDrafts>>,
  TError = ErrorType<unknown>
>(
  params: ArticlesControllerFindDraftsParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindDrafts>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesControllerFindDraftsQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const articlesControllerFindOne = (
  id: number,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ArticleEntity>(
    { url: `/api/v1/articles/${id}`, method: 'GET', signal },
    options
  )
}

export const getArticlesControllerFindOneQueryKey = (id: number) => {
  return [`/api/v1/articles/${id}`] as const
}

export const getArticlesControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesControllerFindOne>>,
  TError = ErrorType<unknown>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindOne>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getArticlesControllerFindOneQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof articlesControllerFindOne>>> = ({
    signal,
  }) => articlesControllerFindOne(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ArticlesControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerFindOne>>
>
export type ArticlesControllerFindOneQueryError = ErrorType<unknown>

export const useArticlesControllerFindOne = <
  TData = Awaited<ReturnType<typeof articlesControllerFindOne>>,
  TError = ErrorType<unknown>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof articlesControllerFindOne>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesControllerFindOneQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const articlesControllerUpdate = (
  id: number,
  updateArticleDto: BodyType<UpdateArticleDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ArticleEntity>(
    {
      url: `/api/v1/articles/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: updateArticleDto,
    },
    options
  )
}

export const getArticlesControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerUpdate>>,
    TError,
    { id: number; data: BodyType<UpdateArticleDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesControllerUpdate>>,
  TError,
  { id: number; data: BodyType<UpdateArticleDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesControllerUpdate>>,
    { id: number; data: BodyType<UpdateArticleDto> }
  > = (props) => {
    const { id, data } = props ?? {}

    return articlesControllerUpdate(id, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ArticlesControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerUpdate>>
>
export type ArticlesControllerUpdateMutationBody = BodyType<UpdateArticleDto>
export type ArticlesControllerUpdateMutationError = ErrorType<unknown>

export const useArticlesControllerUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerUpdate>>,
    TError,
    { id: number; data: BodyType<UpdateArticleDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getArticlesControllerUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}
export const articlesControllerRemove = (
  id: number,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>({ url: `/api/v1/articles/${id}`, method: 'DELETE' }, options)
}

export const getArticlesControllerRemoveMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerRemove>>,
    TError,
    { id: number },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesControllerRemove>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesControllerRemove>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {}

    return articlesControllerRemove(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ArticlesControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesControllerRemove>>
>

export type ArticlesControllerRemoveMutationError = ErrorType<unknown>

export const useArticlesControllerRemove = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesControllerRemove>>,
    TError,
    { id: number },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getArticlesControllerRemoveMutationOptions(options)

  return useMutation(mutationOptions)
}
