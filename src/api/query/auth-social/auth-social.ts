/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import { useMutation } from '@tanstack/react-query'
import type { MutationFunction, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

import { customInstance } from '../../axios/custom-instance'
import type { ErrorType, BodyType } from '../../axios/custom-instance'
import type {
  AuthAppleLoginDto,
  AuthEntity,
  AuthFacebookLoginDto,
  AuthGoogleLoginDto,
  ErrorEntity,
  ErrorServerEntity,
} from '../../types'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * Logs the user into the system using Google authentication
 * @summary Login with Google
 */
export const authGoogleControllerLogin = (
  authGoogleLoginDto: BodyType<AuthGoogleLoginDto>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<AuthEntity>(
    {
      url: `/api/v1/auth/google/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authGoogleLoginDto,
      signal,
    },
    options
  )
}

export const getAuthGoogleControllerLoginMutationOptions = <
  TData = Awaited<ReturnType<typeof authGoogleControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthGoogleLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationKey = ['authGoogleControllerLogin']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authGoogleControllerLogin>>,
    { data: BodyType<AuthGoogleLoginDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authGoogleControllerLogin(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions } as UseMutationOptions<
    TData,
    TError,
    { data: BodyType<AuthGoogleLoginDto> },
    TContext
  >
}

export type AuthGoogleControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authGoogleControllerLogin>>
>
export type AuthGoogleControllerLoginMutationBody = BodyType<AuthGoogleLoginDto>
export type AuthGoogleControllerLoginMutationError = ErrorType<ErrorEntity | ErrorServerEntity>

/**
 * @summary Login with Google
 */
export const useAuthGoogleControllerLogin = <
  TData = Awaited<ReturnType<typeof authGoogleControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthGoogleLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<TData, TError, { data: BodyType<AuthGoogleLoginDto> }, TContext> => {
  const mutationOptions = getAuthGoogleControllerLoginMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Logs the user into the system using Facebook authentication
 * @summary Login with Facebook
 */
export const authFacebookControllerLogin = (
  authFacebookLoginDto: BodyType<AuthFacebookLoginDto>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<AuthEntity>(
    {
      url: `/api/v1/auth/facebook/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authFacebookLoginDto,
      signal,
    },
    options
  )
}

export const getAuthFacebookControllerLoginMutationOptions = <
  TData = Awaited<ReturnType<typeof authFacebookControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthFacebookLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationKey = ['authFacebookControllerLogin']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authFacebookControllerLogin>>,
    { data: BodyType<AuthFacebookLoginDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authFacebookControllerLogin(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions } as UseMutationOptions<
    TData,
    TError,
    { data: BodyType<AuthFacebookLoginDto> },
    TContext
  >
}

export type AuthFacebookControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authFacebookControllerLogin>>
>
export type AuthFacebookControllerLoginMutationBody = BodyType<AuthFacebookLoginDto>
export type AuthFacebookControllerLoginMutationError = ErrorType<ErrorEntity | ErrorServerEntity>

/**
 * @summary Login with Facebook
 */
export const useAuthFacebookControllerLogin = <
  TData = Awaited<ReturnType<typeof authFacebookControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthFacebookLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<TData, TError, { data: BodyType<AuthFacebookLoginDto> }, TContext> => {
  const mutationOptions = getAuthFacebookControllerLoginMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Logs the user into the system using Apple authentication
 * @summary Login with Apple
 */
export const authAppleControllerLogin = (
  authAppleLoginDto: BodyType<AuthAppleLoginDto>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<AuthEntity>(
    {
      url: `/api/v1/auth/apple/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authAppleLoginDto,
      signal,
    },
    options
  )
}

export const getAuthAppleControllerLoginMutationOptions = <
  TData = Awaited<ReturnType<typeof authAppleControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthAppleLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}) => {
  const mutationKey = ['authAppleControllerLogin']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authAppleControllerLogin>>,
    { data: BodyType<AuthAppleLoginDto> }
  > = (props) => {
    const { data } = props ?? {}

    return authAppleControllerLogin(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions } as UseMutationOptions<
    TData,
    TError,
    { data: BodyType<AuthAppleLoginDto> },
    TContext
  >
}

export type AuthAppleControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authAppleControllerLogin>>
>
export type AuthAppleControllerLoginMutationBody = BodyType<AuthAppleLoginDto>
export type AuthAppleControllerLoginMutationError = ErrorType<ErrorEntity | ErrorServerEntity>

/**
 * @summary Login with Apple
 */
export const useAuthAppleControllerLogin = <
  TData = Awaited<ReturnType<typeof authAppleControllerLogin>>,
  TError = ErrorType<ErrorEntity | ErrorServerEntity>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<TData, TError, { data: BodyType<AuthAppleLoginDto> }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<TData, TError, { data: BodyType<AuthAppleLoginDto> }, TContext> => {
  const mutationOptions = getAuthAppleControllerLoginMutationOptions(options)

  return useMutation(mutationOptions)
}
