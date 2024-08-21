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
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { customInstance } from '../../axios/custom-instance'
import type { ErrorType, BodyType } from '../../axios/custom-instance'
import type {
  CreateUserDto,
  ErrorEntity,
  ErrorServerEntity,
  ErrorUnauthorizedEntity,
  ErrorValidationEntity,
  UpdateUserDto,
  UserEntity,
  UsersControllerFindAllParams,
} from '../../types'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * Creates a new user.
 * @summary Create User
 */
export const usersControllerCreate = (
  createUserDto: BodyType<CreateUserDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UserEntity>(
    {
      url: `/api/v1/users`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createUserDto,
    },
    options
  )
}

export const getUsersControllerCreateMutationOptions = <
  TError = ErrorType<
    ErrorUnauthorizedEntity | ErrorEntity | ErrorValidationEntity | ErrorServerEntity
  >,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerCreate>>,
    TError,
    { data: BodyType<CreateUserDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof usersControllerCreate>>,
  TError,
  { data: BodyType<CreateUserDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof usersControllerCreate>>,
    { data: BodyType<CreateUserDto> }
  > = (props) => {
    const { data } = props ?? {}

    return usersControllerCreate(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UsersControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerCreate>>
>
export type UsersControllerCreateMutationBody = BodyType<CreateUserDto>
export type UsersControllerCreateMutationError = ErrorType<
  ErrorUnauthorizedEntity | ErrorEntity | ErrorValidationEntity | ErrorServerEntity
>

/**
 * @summary Create User
 */
export const useUsersControllerCreate = <
  TError = ErrorType<
    ErrorUnauthorizedEntity | ErrorEntity | ErrorValidationEntity | ErrorServerEntity
  >,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerCreate>>,
    TError,
    { data: BodyType<CreateUserDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof usersControllerCreate>>,
  TError,
  { data: BodyType<CreateUserDto> },
  TContext
> => {
  const mutationOptions = getUsersControllerCreateMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Retrieves a list of all users.
 * @summary Find All Users
 */
export const usersControllerFindAll = (
  params: UsersControllerFindAllParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<UserEntity[]>(
    { url: `/api/v1/users`, method: 'GET', params, signal },
    options
  )
}

export const getUsersControllerFindAllQueryKey = (params: UsersControllerFindAllParams) => {
  return [`/api/v1/users`, ...(params ? [params] : [])] as const
}

export const getUsersControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>
>(
  params: UsersControllerFindAllParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getUsersControllerFindAllQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindAll>>> = ({ signal }) =>
    usersControllerFindAll(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof usersControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type UsersControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerFindAll>>
>
export type UsersControllerFindAllQueryError = ErrorType<
  ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity
>

/**
 * @summary Find All Users
 */

export function useUsersControllerFindAll<
  TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>
>(
  params: UsersControllerFindAllParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getUsersControllerFindAllQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Retrieves a user by its ID.
 * @summary Find User by ID
 */
export const usersControllerFindOne = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<UserEntity>({ url: `/api/v1/users/${id}`, method: 'GET', signal }, options)
}

export const getUsersControllerFindOneQueryKey = (id: string) => {
  return [`/api/v1/users/${id}`] as const
}

export const getUsersControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>
>(
  id: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getUsersControllerFindOneQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindOne>>> = ({ signal }) =>
    usersControllerFindOne(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof usersControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type UsersControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerFindOne>>
>
export type UsersControllerFindOneQueryError = ErrorType<
  ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity
>

/**
 * @summary Find User by ID
 */

export function useUsersControllerFindOne<
  TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>
>(
  id: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
    request?: SecondParameter<typeof customInstance>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getUsersControllerFindOneQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Updates a user with the provided details.
 * @summary Update User
 */
export const usersControllerUpdate = (
  id: string,
  updateUserDto: BodyType<UpdateUserDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UserEntity>(
    {
      url: `/api/v1/users/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: updateUserDto,
    },
    options
  )
}

export const getUsersControllerUpdateMutationOptions = <
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateUserDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof usersControllerUpdate>>,
  TError,
  { id: string; data: BodyType<UpdateUserDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof usersControllerUpdate>>,
    { id: string; data: BodyType<UpdateUserDto> }
  > = (props) => {
    const { id, data } = props ?? {}

    return usersControllerUpdate(id, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UsersControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerUpdate>>
>
export type UsersControllerUpdateMutationBody = BodyType<UpdateUserDto>
export type UsersControllerUpdateMutationError = ErrorType<
  ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity
>

/**
 * @summary Update User
 */
export const useUsersControllerUpdate = <
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateUserDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof usersControllerUpdate>>,
  TError,
  { id: string; data: BodyType<UpdateUserDto> },
  TContext
> => {
  const mutationOptions = getUsersControllerUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Deletes a user by their unique identifier.
 * @summary Remove User
 */
export const usersControllerRemove = (
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UserEntity>({ url: `/api/v1/users/${id}`, method: 'DELETE' }, options)
}

export const getUsersControllerRemoveMutationOptions = <
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerRemove>>,
    TError,
    { id: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof usersControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof usersControllerRemove>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {}

    return usersControllerRemove(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UsersControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerRemove>>
>

export type UsersControllerRemoveMutationError = ErrorType<
  ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity
>

/**
 * @summary Remove User
 */
export const useUsersControllerRemove = <
  TError = ErrorType<ErrorUnauthorizedEntity | ErrorEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof usersControllerRemove>>,
    TError,
    { id: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof usersControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = getUsersControllerRemoveMutationOptions(options)

  return useMutation(mutationOptions)
}
