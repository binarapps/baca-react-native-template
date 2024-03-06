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
  AuthConfirmEmailDto,
  AuthEmailLoginDto,
  AuthEntity,
  AuthForgotPasswordDto,
  AuthRegisterLoginDto,
  AuthResetPasswordDto,
  AuthUpdateDto,
  RefreshEntity,
  UserEntity,
} from '../../types'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const authControllerLogin = (
  authEmailLoginDto: BodyType<AuthEmailLoginDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<AuthEntity>(
    {
      url: `/api/v1/auth/email/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authEmailLoginDto,
    },
    options
  )
}

export const getAuthControllerLoginMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: BodyType<AuthEmailLoginDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: BodyType<AuthEmailLoginDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: BodyType<AuthEmailLoginDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerLogin(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>
export type AuthControllerLoginMutationBody = BodyType<AuthEmailLoginDto>
export type AuthControllerLoginMutationError = ErrorType<unknown>

export const useAuthControllerLogin = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: BodyType<AuthEmailLoginDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerRegister = (
  authRegisterLoginDto: BodyType<AuthRegisterLoginDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UserEntity>(
    {
      url: `/api/v1/auth/email/register`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authRegisterLoginDto,
    },
    options
  )
}

export const getAuthControllerRegisterMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: BodyType<AuthRegisterLoginDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: BodyType<AuthRegisterLoginDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRegister>>,
    { data: BodyType<AuthRegisterLoginDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerRegister(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerRegisterMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerRegister>>
>
export type AuthControllerRegisterMutationBody = BodyType<AuthRegisterLoginDto>
export type AuthControllerRegisterMutationError = ErrorType<unknown>

export const useAuthControllerRegister = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: BodyType<AuthRegisterLoginDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerRegisterMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerConfirmEmail = (
  authConfirmEmailDto: BodyType<AuthConfirmEmailDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/v1/auth/email/confirm`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authConfirmEmailDto,
    },
    options
  )
}

export const getAuthControllerConfirmEmailMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerConfirmEmail>>,
    TError,
    { data: BodyType<AuthConfirmEmailDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerConfirmEmail>>,
  TError,
  { data: BodyType<AuthConfirmEmailDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerConfirmEmail>>,
    { data: BodyType<AuthConfirmEmailDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerConfirmEmail(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerConfirmEmailMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerConfirmEmail>>
>
export type AuthControllerConfirmEmailMutationBody = BodyType<AuthConfirmEmailDto>
export type AuthControllerConfirmEmailMutationError = ErrorType<unknown>

export const useAuthControllerConfirmEmail = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerConfirmEmail>>,
    TError,
    { data: BodyType<AuthConfirmEmailDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerConfirmEmailMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerForgotPassword = (
  authForgotPasswordDto: BodyType<AuthForgotPasswordDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/v1/auth/forgot/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authForgotPasswordDto,
    },
    options
  )
}

export const getAuthControllerForgotPasswordMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    TError,
    { data: BodyType<AuthForgotPasswordDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerForgotPassword>>,
  TError,
  { data: BodyType<AuthForgotPasswordDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    { data: BodyType<AuthForgotPasswordDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerForgotPassword(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerForgotPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerForgotPassword>>
>
export type AuthControllerForgotPasswordMutationBody = BodyType<AuthForgotPasswordDto>
export type AuthControllerForgotPasswordMutationError = ErrorType<unknown>

export const useAuthControllerForgotPassword = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    TError,
    { data: BodyType<AuthForgotPasswordDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerForgotPasswordMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerResetPassword = (
  authResetPasswordDto: BodyType<AuthResetPasswordDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/v1/auth/reset/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authResetPasswordDto,
    },
    options
  )
}

export const getAuthControllerResetPasswordMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerResetPassword>>,
    TError,
    { data: BodyType<AuthResetPasswordDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerResetPassword>>,
  TError,
  { data: BodyType<AuthResetPasswordDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerResetPassword>>,
    { data: BodyType<AuthResetPasswordDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerResetPassword(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerResetPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerResetPassword>>
>
export type AuthControllerResetPasswordMutationBody = BodyType<AuthResetPasswordDto>
export type AuthControllerResetPasswordMutationError = ErrorType<unknown>

export const useAuthControllerResetPassword = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerResetPassword>>,
    TError,
    { data: BodyType<AuthResetPasswordDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerResetPasswordMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerMe = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<UserEntity>({ url: `/api/v1/auth/me`, method: 'GET', signal }, options)
}

export const getAuthControllerMeQueryKey = () => {
  return [`/api/v1/auth/me`] as const
}

export const getAuthControllerMeQueryOptions = <
  TData = Awaited<ReturnType<typeof authControllerMe>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof authControllerMe>>, TError, TData>
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getAuthControllerMeQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof authControllerMe>>> = ({ signal }) =>
    authControllerMe(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof authControllerMe>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type AuthControllerMeQueryResult = NonNullable<Awaited<ReturnType<typeof authControllerMe>>>
export type AuthControllerMeQueryError = ErrorType<unknown>

export const useAuthControllerMe = <
  TData = Awaited<ReturnType<typeof authControllerMe>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof authControllerMe>>, TError, TData>
  request?: SecondParameter<typeof customInstance>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getAuthControllerMeQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const authControllerUpdate = (
  authUpdateDto: BodyType<AuthUpdateDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/v1/auth/me`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: authUpdateDto,
    },
    options
  )
}

export const getAuthControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerUpdate>>,
    TError,
    { data: BodyType<AuthUpdateDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerUpdate>>,
  TError,
  { data: BodyType<AuthUpdateDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerUpdate>>,
    { data: BodyType<AuthUpdateDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerUpdate(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerUpdate>>
>
export type AuthControllerUpdateMutationBody = BodyType<AuthUpdateDto>
export type AuthControllerUpdateMutationError = ErrorType<unknown>

export const useAuthControllerUpdate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerUpdate>>,
    TError,
    { data: BodyType<AuthUpdateDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerDelete = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<void>({ url: `/api/v1/auth/me`, method: 'DELETE' }, options)
}

export const getAuthControllerDeleteMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerDelete>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerDelete>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerDelete>>,
    void
  > = () => {
    return authControllerDelete(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerDeleteMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerDelete>>
>

export type AuthControllerDeleteMutationError = ErrorType<unknown>

export const useAuthControllerDelete = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerDelete>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerDeleteMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerRefresh = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<RefreshEntity>({ url: `/api/v1/auth/refresh`, method: 'POST' }, options)
}

export const getAuthControllerRefreshMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRefresh>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    void
  > = () => {
    return authControllerRefresh(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerRefreshMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerRefresh>>
>

export type AuthControllerRefreshMutationError = ErrorType<unknown>

export const useAuthControllerRefresh = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRefresh>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerRefreshMutationOptions(options)

  return useMutation(mutationOptions)
}
export const authControllerLogout = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<void>({ url: `/api/v1/auth/logout`, method: 'POST' }, options)
}

export const getAuthControllerLogoutMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogout>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogout>>,
    void
  > = () => {
    return authControllerLogout(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogout>>
>

export type AuthControllerLogoutMutationError = ErrorType<unknown>

export const useAuthControllerLogout = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationOptions = getAuthControllerLogoutMutationOptions(options)

  return useMutation(mutationOptions)
}
